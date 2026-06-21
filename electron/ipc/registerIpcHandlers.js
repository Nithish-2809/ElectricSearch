import { ipcMain } from "electron";
import {
    handlePickFolder,
    handleGetIndexedFolders
} from "../controllers/FolderController.js";

export function registerIpcHandlers() {
    ipcMain.handle("pick-folder", handlePickFolder);
    ipcMain.handle("get-indexed-folders", handleGetIndexedFolders);
}