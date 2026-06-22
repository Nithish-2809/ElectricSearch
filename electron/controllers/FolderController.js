import { pickFolder, saveFolder,getIndexedFolders,deleteFolder } from "../services/FolderService.js";
import { getImagesFromFolder } from "../services/ImageService.js";

export async function handlePickFolder() {
    const folder = await pickFolder();

    if (!folder) {
        return null;
    }

    const savedFolder = await saveFolder(folder);

    const images = await getImagesFromFolder(folder);

    await saveImages(savedFolder.id, images);

    return {
        folder: savedFolder,
        imageCount: images.length
    };

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