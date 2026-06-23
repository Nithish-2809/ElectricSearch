import { app, BrowserWindow} from "electron";
import { registerIpcHandlers } from "./ipc/registerIpcHandlers.js";
import path from "path";
import { fileURLToPath } from "url";
import {connectDatabase} from "./database/database.js";
import { pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    console.log(
    pathToFileURL(
        "C:\\Users\\Kowshik\\OneDrive\\Pictures\\Screenshots\\2023-07-09.png"
    ).href
);

    win.loadURL("http://localhost:5173");

    win.webContents.openDevTools();
}

app.whenReady().then(async () => {
    await connectDatabase();
    registerIpcHandlers();
    createWindow();
});