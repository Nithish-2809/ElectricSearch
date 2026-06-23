import { saveFolder } from "./FolderService.js";
import { getImagesFromFolder, saveImages } from "./ImageService.js";
import { extractText } from "./OCRService.js";
import { saveOCRText } from "../database/IndexRepository.js";

export async function startIndexing(folderPath) {
    const savedFolder = await saveFolder(folderPath);

    const images = await getImagesFromFolder(folderPath);

    await saveImages(savedFolder.id, images);

    const text = await extractText(images[0]);

    await saveOCRText(images[0], text);

    return {
        folder: savedFolder,
        imageCount: images.length,
    };
}