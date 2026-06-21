import { app, BrowserWindow,ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";

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

    win.loadURL("http://localhost:5173");

    win.webContents.openDevTools();
}

ipcMain.handle("ping", async () => {
    console.log("Ping received from React");
    return "Pong from Electron Main";
});

app.whenReady().then(() => {
    createWindow();
});