import { saveFolder } from "./FolderService.js";
import { getImagesFromFolder, saveImages } from "./ImageService.js";
import { extractText } from "./OCRService.js";

export async function startIndexing(folderPath) {
    const savedFolder = await saveFolder(folderPath);

    const images = await getImagesFromFolder(folderPath);

    return {
        folder: savedFolder,
        imageCount: images.length,
    };
}