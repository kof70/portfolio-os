import { spawn } from "node:child_process";
import fs from "node:fs/promises";

const PROJECT_ROOT = process.cwd();

const JOBS = [
  {
    input: `${PROJECT_ROOT}/public/assets/cv-source.html`,
    output: `${PROJECT_ROOT}/public/assets/djakpa-koffi-cv.pdf`,
  },
  {
    input: `${PROJECT_ROOT}/public/assets/cv-source-en.html`,
    output: `${PROJECT_ROOT}/public/assets/djakpa-koffi-cv-en.pdf`,
  },
  {
    input: `${PROJECT_ROOT}/public/assets/cv-source-variant-fullstack-devops.html`,
    output: `${PROJECT_ROOT}/public/assets/djakpa-koffi-cv-variant-fullstack-devops.pdf`,
  },
];

function mmToInches(mm) {
  return mm / 25.4;
}

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`Expected JSON from ${url} but got: ${text.slice(0, 200)}`);
  }
}


function withTimeout(promise, timeoutMs, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(message)), timeoutMs),
    ),
  ]);
}

async function connectCdp(wsUrl) {
  if (typeof WebSocket === "undefined") {
    throw new Error("Global WebSocket is not available in this Node.js runtime");
  }

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  let nextId = 1;
  const pending = new Map();
  const listeners = new Map();

  ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message || "CDP error"));
      else resolve(message.result);
      return;
    }
    if (message.method && listeners.has(message.method)) {
      listeners.get(message.method)(message.params);
    }
  });

  function send(method, params) {
    const id = nextId++;
    ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
  }

  function once(method) {
    return new Promise((resolve) => {
      listeners.set(method, (params) => {
        listeners.delete(method);
        resolve(params);
      });
    });
  }

  function close() {
    try {
      ws.close();
    } catch {
      // ignore
    }
  }

  return { send, once, close };
}

async function renderPdf(inputHtmlPath, outputPdfPath) {
  const fileUrl = `file://${inputHtmlPath}`;

  const port = 9200 + Math.floor(Math.random() * 800);
  const tmpDir = `/tmp/chrome-cv-${port}`;
  const chromeArgs = [
    "run",
    "com.google.Chrome",
    "--",
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--no-first-run",
    `--user-data-dir=${tmpDir}`,
    `--remote-debugging-port=${port}`,
    "--remote-debugging-address=127.0.0.1",
    "--enable-logging=stderr",
  ];

  const chrome = spawn("flatpak", chromeArgs, {
    stdio: ["ignore", "ignore", "pipe"],
    detached: false,
    env: {
      ...process.env,
      XDG_RUNTIME_DIR: process.env.XDG_RUNTIME_DIR || `/tmp/xdg-runtime-${process.getuid()}`,
    },
  });

  async function pollDevTools(timeoutMs = 20_000) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/version`);
        if (res.ok) return;
      } catch {
        // not ready yet
      }
      await new Promise((r) => setTimeout(r, 200));
    }
    throw new Error("Timed out waiting for Chrome DevTools endpoint");
  }

  try {
    await pollDevTools(20_000);

    const target = await fetchJson(
      `http://127.0.0.1:${port}/json/new?${encodeURIComponent(fileUrl)}`,
      { method: "PUT" },
    );
    const cdp = await connectCdp(target.webSocketDebuggerUrl);
    try {
      await cdp.send("Page.enable");
      await cdp.send("Runtime.enable");

      const loadPromise = cdp.once("Page.loadEventFired");
      await cdp.send("Page.navigate", { url: fileUrl });
      await withTimeout(loadPromise, 15_000, "Timed out waiting for page load");

      const pdf = await cdp.send("Page.printToPDF", {
        displayHeaderFooter: false,
        printBackground: true,
        paperWidth: mmToInches(210),
        paperHeight: mmToInches(297),
        marginTop: mmToInches(14),
        marginBottom: mmToInches(14),
        marginLeft: mmToInches(12),
        marginRight: mmToInches(12),
        preferCSSPageSize: true,
      });

      await fs.writeFile(outputPdfPath, Buffer.from(pdf.data, "base64"));
      process.stdout.write(`Wrote ${outputPdfPath}\n`);
    } finally {
      cdp.close();
    }
  } finally {
    const waitExit = () => new Promise((resolve) => chrome.once("exit", resolve));

    chrome.kill("SIGTERM");
    try {
      process.kill(-chrome.pid, "SIGTERM");
    } catch {
      // ignore if process group kill fails
    }

    const exited = await withTimeout(waitExit(), 2_500, "Chrome did not exit").then(
      () => true,
      () => false,
    );

    if (!exited) {
      try {
        process.kill(-chrome.pid, "SIGKILL");
      } catch {
        chrome.kill("SIGKILL");
      }
      await withTimeout(waitExit(), 2_500, "Chrome did not exit after SIGKILL").catch(() => {});
    }

    chrome.stderr?.destroy();
  }
}

for (const job of JOBS) {
  await renderPdf(job.input, job.output);
}
