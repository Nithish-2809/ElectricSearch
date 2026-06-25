import chokidar from "chokidar";

class FolderWatcherService {
    constructor() {
        this.watchers = new Map();
    }
}

const folderWatcherService = new FolderWatcherService();

export default folderWatcherService;