import { spawn } from "node:child_process";
import fs from "node:fs/promises";

const PROJECT_ROOT = process.cwd();
const INPUT_HTML_PATH = `${PROJECT_ROOT}/public/assets/cv-source.html`;
const OUTPUT_PDF_PATH = `${PROJECT_ROOT}/public/assets/djakpa-koffi-cv.pdf`;

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

function waitForLine(stream, predicate, { timeoutMs = 10_000 } = {}) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("Timed out waiting for Chrome to report DevTools endpoint"));
    }, timeoutMs);

    let buffer = "";

    function onData(chunk) {
      buffer += chunk.toString("utf8");
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const match = predicate(line);
        if (match) {
          cleanup();
          resolve(match);
          return;
        }
      }
    }

    function onErr(error) {
      cleanup();
      reject(error);
    }

    function cleanup() {
      clearTimeout(timeout);
      stream.off("data", onData);
      stream.off("error", onErr);
    }

    stream.on("data", onData);
    stream.on("error", onErr);
  });
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

async function main() {
  const fileUrl = `file://${INPUT_HTML_PATH}`;

  const chromeArgs = [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--remote-debugging-port=0",
    "--remote-debugging-address=127.0.0.1",
    "--enable-logging=stderr",
    "--v=0",
  ];

  const chrome = spawn("google-chrome", chromeArgs, {
    stdio: ["ignore", "ignore", "pipe"],
    detached: true,
    env: {
      ...process.env,
      XDG_RUNTIME_DIR: process.env.XDG_RUNTIME_DIR || `/tmp/xdg-runtime-${process.getuid()}`,
    },
  });

  try {
    const devtoolsPort = await waitForLine(
      chrome.stderr,
      (line) => {
        const match = line.match(/DevTools listening on ws:\/\/127\.0\.0\.1:(\d+)\//);
        return match ? parseInt(match[1], 10) : null;
      },
      { timeoutMs: 15_000 },
    );

    const target = await fetchJson(
      `http://127.0.0.1:${devtoolsPort}/json/new?${encodeURIComponent(fileUrl)}`,
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

      await fs.writeFile(OUTPUT_PDF_PATH, Buffer.from(pdf.data, "base64"));
      process.stdout.write(`Wrote ${OUTPUT_PDF_PATH}\n`);
    } finally {
      cdp.close();
    }
  } finally {
    const waitExit = () => new Promise((resolve) => chrome.once("exit", resolve));

    try {
      process.kill(-chrome.pid, "SIGTERM");
    } catch {
      chrome.kill("SIGTERM");
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

await main();
