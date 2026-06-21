import { pickFolder, saveFolder,getIndexedFolders } from "../services/FolderService.js";

export async function handlePickFolder() {
    const folder = await pickFolder();

    if (!folder) {
        return null;
    }

    await saveFolder(folder);

    return folder;
}

export async function handleGetIndexedFolders() {
    return await getIndexedFolders();
}