import { saveFolder } from "./FolderService.js";
import { getImagesFromFolder, saveImages } from "./ImageService.js";
import { extractText } from "./OCRService.js";
import { saveOCRText } from "../database/IndexRepository.js";

export async function startIndexing(folderPath) {
  const savedFolder = await saveFolder(folderPath);

  const images = await getImagesFromFolder(folderPath);

  await saveImages(savedFolder.id, images);

  for (const image of images) {
    try {
      const text = await extractText(image);

      await saveOCRText(image, text);
    } catch (error) {
      console.error(`Failed OCR: ${image}`);
      console.error(error);
    }
  }

  return {
    folder: savedFolder,
    imageCount: images.length,
  };
}
