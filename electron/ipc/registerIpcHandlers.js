import { ipcMain } from "electron";
import {
    handlePickFolder,
    handleGetIndexedFolders,
    handleDeleteFolder
} from "../controllers/FolderController.js";
import { handleSearch } from "../controllers/SearchController.js";
import { handleGetImageUrl } from "../controllers/ImageController.js";

export function registerIpcHandlers() {
    ipcMain.handle("pick-folder", handlePickFolder);
    ipcMain.handle("get-indexed-folders", handleGetIndexedFolders);
    ipcMain.handle("delete-folder", handleDeleteFolder);
    ipcMain.handle("search-images", handleSearch);
    ipcMain.handle("get-image-url", handleGetImageUrl);
}