import { ipcMain } from "electron";
import {
    handlePickFolder,
    handleGetIndexedFolders,
    handleDeleteFolder
} from "../controllers/FolderController.js";

export function registerIpcHandlers() {
    ipcMain.handle("pick-folder", handlePickFolder);
    ipcMain.handle("get-indexed-folders", handleGetIndexedFolders);
    ipcMain.handle("delete-folder", handleDeleteFolder);
}