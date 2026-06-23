import { app, BrowserWindow, protocol } from "electron";
import { registerIpcHandlers } from "./ipc/registerIpcHandlers.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDatabase } from "./database/database.js";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadURL("http://localhost:5173");

  win.webContents.openDevTools();
}

app.whenReady().then(async () => {
  await connectDatabase();
  registerIpcHandlers();
  protocol.handle("electricsearch", async (request) => {
    const url = new URL(request.url);

    const imagePath = decodeURIComponent(url.searchParams.get("path"));

    console.log(imagePath);

    const file = await fs.readFile(imagePath);

    return new Response(file, {
      headers: {
        "Content-Type": "image/png",
      },
    });
  });
  createWindow();
});
