import { pickFolder, saveFolder } from "../services/FolderService.js";

export async function handlePickFolder() {
    const folder = await pickFolder();

    if (!folder) {
        return null;
    }

    await saveFolder(folder);

    return folder;
}