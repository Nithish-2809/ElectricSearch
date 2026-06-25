import {
    pickFolder,
    getIndexedFolders,
    deleteFolder,
    getFolderById
} from "../services/FolderService.js";
import folderWatcherService from "../services/FolderWatcherService.js";

import { startIndexing } from "../services/IndexingService.js";

export async function handlePickFolder() {
    const folder = await pickFolder();

    if (!folder) return null;

    return await startIndexing(folder);
}

export async function handleGetIndexedFolders() {
    return await getIndexedFolders();
}

export async function handleDeleteFolder(event, id) {
    const folder = await getFolderById(id);

    if (folder) {
        folderWatcherService.unwatch(folder.path);
    }

    await deleteFolder(id);

    return true;
}