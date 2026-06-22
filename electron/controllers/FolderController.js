import {
    pickFolder,
    getIndexedFolders,
    deleteFolder
} from "../services/FolderService.js";

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
    return await deleteFolder(id);
}