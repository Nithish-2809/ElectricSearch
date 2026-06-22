import { pickFolder, saveFolder,getIndexedFolders,deleteFolder } from "../services/FolderService.js";

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

export async function handleDeleteFolder(_, id) {
    await deleteFolder(id);
}