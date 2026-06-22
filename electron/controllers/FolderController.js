import { pickFolder, saveFolder,getIndexedFolders,deleteFolder } from "../services/FolderService.js";
import { getImagesFromFolder } from "../services/ImageService.js";

export async function handlePickFolder() {
    const folder = await pickFolder();

    if (!folder) {
        return null;
    }

    await saveFolder(folder);

    const images = await getImagesFromFolder(folder);

    console.log(images);

    return {
        folder,images
    };
}

export async function handleGetIndexedFolders() {
    return await getIndexedFolders();
}

export async function handleDeleteFolder(_, id) {
    await deleteFolder(id);
}