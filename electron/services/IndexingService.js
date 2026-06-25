import { saveFolder } from "./FolderService.js";
import { getImagesFromFolder, saveImages } from "./ImageService.js";
import { searchOCR } from "../database/IndexRepository.js";
import workerPool from "../workers/WorkerPool.js";
import folderWatcherService from "./FolderWatcherService.js";
import { generateEmbedding } from "./EmbeddingService.js";

export async function startIndexing(folderPath) {
  const embedding = await generateEmbedding("Hello World");

    console.log(embedding.length);
    console.log(embedding.slice(0, 10));
  const savedFolder = await saveFolder(folderPath);

  const images = await getImagesFromFolder(folderPath);

 const savedImages = await saveImages(savedFolder.id, images);


await workerPool.indexImages(savedImages);
folderWatcherService.watch(savedFolder.id, folderPath);

  return {
    folder: savedFolder,
    imageCount: images.length,
  };
}

export async function searchImages(query) {
    return await searchOCR(query);
}