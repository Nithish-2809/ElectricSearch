import chokidar from "chokidar";
import path from "node:path";

class FolderWatcherService {
    constructor() {
        this.watchers = new Map();
    }

    watch(folderPath) {
        if (this.watchers.has(folderPath)) {
            return;
        }

        const watcher = chokidar.watch(folderPath, {
            persistent: true,
            ignoreInitial: true,
        });

        watcher.on("add", (filePath) => {
            if (!this.isImage(filePath)) return;

            console.log("Image Added:", filePath);

            // TODO:
            // save image metadata
            // OCR
            // save OCR
            // notify UI
        });

        watcher.on("unlink", (filePath) => {
            if (!this.isImage(filePath)) return;

            console.log("Image Deleted:", filePath);

            // TODO:
            // DELETE FROM images WHERE path = ?
        });

        watcher.on("change", (filePath) => {
            if (!this.isImage(filePath)) return;

            console.log("Image Modified:", filePath);

            // Optional:
            // Re-run OCR if required
        });

        watcher.on("addDir", (dir) => {
            console.log("Directory Added:", dir);
        });

        watcher.on("unlinkDir", (dir) => {
            console.log("Directory Deleted:", dir);
        });

        watcher.on("error", (err) => {
            console.error(err);
        });

        this.watchers.set(folderPath, watcher);
    }

    unwatch(folderPath) {
        const watcher = this.watchers.get(folderPath);

        if (!watcher) return;

        watcher.close();

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

        return [
            ".png",
            ".jpg",
            ".jpeg",
            ".webp",
            ".bmp",
        ].includes(ext);
    }
}

const folderWatcherService = new FolderWatcherService();

export default folderWatcherService;