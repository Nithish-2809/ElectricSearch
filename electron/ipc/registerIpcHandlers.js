import { ipcMain } from "electron";
import { handlePickFolder } from "../controllers/FolderController.js";

export function registerIpcHandlers() {
    ipcMain.handle("pick-folder", handlePickFolder);
}