import { saveFolder } from "./FolderService.js";
import { getImagesFromFolder, saveImages } from "./ImageService.js";

export async function startIndexing(folderPath) {
    const savedFolder = await saveFolder(folderPath);

    const images = await getImagesFromFolder(folderPath);

    await saveImages(savedFolder.id, images);

    return {
        folder: savedFolder,
        imageCount: images.length,
    };
}