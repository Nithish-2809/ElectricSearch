import { saveFolder } from "./FolderService.js";
import { getImagesFromFolder, saveImages } from "./ImageService.js";
import { searchOCR } from "../database/IndexRepository.js";
import workerPool from "../workers/WorkerPool.js";

export async function startIndexing(folderPath) {
  const savedFolder = await saveFolder(folderPath);

  const images = await getImagesFromFolder(folderPath);

 const savedImages = await saveImages(savedFolder.id, images);

console.time("Indexing");
await workerPool.indexImages(savedImages);
console.timeEnd("Indexing");

  return {
    folder: savedFolder,
    imageCount: images.length,
  };
}

export async function searchImages(query) {
    return await searchOCR(query);
}