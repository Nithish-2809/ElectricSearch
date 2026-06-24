import os from "node:os";
import path from "node:path";
import { Worker } from "node:worker_threads";

class WorkerPool {
    constructor() {
        this.workerCount = Math.max(1, os.cpus().length - 1);

        this.workers = [];
        this.idleWorkers = [];
        this.queue = [];
    }
}

export default WorkerPool;