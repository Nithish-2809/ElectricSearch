import chokidar from "chokidar";
import path from "node:path";

import { saveImage } from "./ImageService.js";
import workerPool from "../workers/WorkerPool.js";
import { deleteImage } from "../database/IndexRepository.js";
import { getIndexedFolders } from "./FolderService.js";

class FolderWatcherService {
  constructor() {
    this.watchers = new Map();
  }

  watch(folderId, folderPath) {
    if (this.watchers.has(folderPath)) {
      return;
    }

    const watcher = chokidar.watch(folderPath, {
      persistent: true,
      ignoreInitial: true,
    });

    watcher.on("add", async (filePath) => {
      if (!this.isImage(filePath)) return;

     

      try {
        const image = await saveImage(folderId, filePath);

        await workerPool.indexImages([image]);
      } catch (error) {
        console.error("Add Error:", error);
      }
    });

    watcher.on("unlink", async (filePath) => {
      if (!this.isImage(filePath)) return;


      try {
        await deleteImage(filePath);
      } catch (error) {
        console.error("Delete Error:", error);
      }
    });

    watcher.on("change", (filePath) => {
      if (!this.isImage(filePath)) return;


      // Optional:
      // Re-run OCR if image content changes.
    });

    watcher.on("addDir", (dirPath) => {
    });

    watcher.on("unlinkDir", (dirPath) => {
    });

    watcher.on("error", (error) => {
      console.error("Watcher Error:", error);
    });

    this.watchers.set(folderPath, watcher);

  }

  async unwatch(folderPath) {
    const watcher = this.watchers.get(folderPath);

    if (!watcher) return;

    await watcher.close();

    this.watchers.delete(folderPath);


  }

  async closeAll() {
    for (const watcher of this.watchers.values()) {
      await watcher.close();
    }

    this.watchers.clear();
  }

  isImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();

    return [".png", ".jpg", ".jpeg", ".webp", ".bmp"].includes(ext);
  }
  async restoreWatchers() {
    const folders = await getIndexedFolders();

    for (const folder of folders) {
      this.watch(folder.id, folder.path);
    }

  
  }
}

const folderWatcherService = new FolderWatcherService();

export default folderWatcherService;
