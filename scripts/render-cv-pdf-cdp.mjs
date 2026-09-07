/**
 * Regenerate the CV PDFs from the source HTML.
 *
 * The flatpak-based script (`render-cv-pdf-flatpak.mjs`) fails when a desktop
 * Chrome session is already running, so this one drives the Playwright Chromium
 * over the DevTools protocol instead. Same A4 page box and margins.
 *
 *   node scripts/render-cv-pdf-cdp.mjs
 */
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const ROOT = path.resolve(import.meta.dirname, "..");
const CHROME =
  process.env.CHROME_BIN ||
  `${os.homedir()}/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome`;

const JOBS = [
  {
    input: `${ROOT}/public/assets/cv-source.html`,
    output: `${ROOT}/public/assets/djakpa-koffi-cv.pdf`,
  },
  {
    input: `${ROOT}/public/assets/cv-source-en.html`,
    output: `${ROOT}/public/assets/djakpa-koffi-cv-en.pdf`,
  },
];

const mm = (v) => v / 25.4;

async function fetchJson(url, options) {
  const res = await fetch(url, options);
  return JSON.parse(await res.text());
}

function withTimeout(p, ms, msg) {
  return Promise.race([
    p,
    new Promise((_, r) => setTimeout(() => r(new Error(msg)), ms)),
  ]);
}

async function connectCdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });
  let nextId = 1;
  const pending = new Map();
  const listeners = new Map();
  ws.addEventListener("message", (event) => {
    const m = JSON.parse(event.data);
    if (m.id && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? reject(new Error(m.error.message)) : resolve(m.result);
      return;
    }
    if (m.method && listeners.has(m.method)) listeners.get(m.method)(m.params);
  });
  const send = (method, params) => {
    const id = nextId++;
    ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
  };
  const once = (method) =>
    new Promise((resolve) =>
      listeners.set(method, (p) => {
        listeners.delete(method);
        resolve(p);
      }),
    );
  return { send, once, close: () => ws.close() };
}

async function render(input, output, port) {
  const fileUrl = `file://${input}`;
  const chrome = spawn(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=/tmp/chrome-cv-${port}`,
      `--remote-debugging-port=${port}`,
      "--remote-debugging-address=127.0.0.1",
    ],
    { stdio: ["ignore", "ignore", "pipe"], detached: true },
  );
  async function poll(timeoutMs = 20000) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      try {
        const res = await fetch(`http://127.0.0.1:${port}/json/version`);
        if (res.ok) return;
      } catch {}
      await new Promise((r) => setTimeout(r, 200));
    }
    throw new Error("devtools timeout");
  }
  try {
    await poll();
    const target = await fetchJson(
      `http://127.0.0.1:${port}/json/new?${encodeURIComponent(fileUrl)}`,
      { method: "PUT" },
    );
    const cdp = await connectCdp(target.webSocketDebuggerUrl);
    try {
      await cdp.send("Page.enable");
      const loaded = cdp.once("Page.loadEventFired");
      await cdp.send("Page.navigate", { url: fileUrl });
      await withTimeout(loaded, 15000, "load timeout");
      await new Promise((r) => setTimeout(r, 400));
      const pdf = await cdp.send("Page.printToPDF", {
        displayHeaderFooter: false,
        printBackground: true,
        paperWidth: mm(210),
        paperHeight: mm(297),
        marginTop: mm(14),
        marginBottom: mm(14),
        marginLeft: mm(12),
        marginRight: mm(12),
        preferCSSPageSize: true,
      });
      await fs.writeFile(output, Buffer.from(pdf.data, "base64"));
      console.log(`Wrote ${output}`);
    } finally {
      cdp.close();
    }
  } finally {
    try {
      process.kill(-chrome.pid, "SIGKILL");
    } catch {
      chrome.kill("SIGKILL");
    }
  }
}

let port = 9500;
for (const job of JOBS) await render(job.input, job.output, port++);
