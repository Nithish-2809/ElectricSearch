import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

class WorkerPool {
    constructor() {
        this.workerCount = Math.max(1, os.cpus().length - 1);

        this.workers = [];
        this.idleWorkers = [];
        this.queue = [];

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const workerPath = path.join(__dirname, "OCRWorker.js");

        for (let i = 0; i < this.workerCount; i++) {
            const worker = new Worker(workerPath);

            this.workers.push(worker);
            this.idleWorkers.push(worker);
        }
    }
}

export default WorkerPool;