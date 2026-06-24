import { saveFolder } from "./FolderService.js";
import { getImagesFromFolder, saveImages } from "./ImageService.js";
import { extractText } from "./OCRService.js";
import { saveOCRText } from "../database/IndexRepository.js";
import { searchOCR } from "../database/IndexRepository.js";
import { WorkerPool } from "../workers/WorkerPool.js";

const workerPool = new WorkerPool();

export async function startIndexing(folderPath) {
  const savedFolder = await saveFolder(folderPath);

  const images = await getImagesFromFolder(folderPath);

  await saveImages(savedFolder.id, images);

  await workerPool.indexImages(images);

  return {
    folder: savedFolder,
    imageCount: images.length,
  };
}

export async function searchImages(query) {
    return await searchOCR(query);
}