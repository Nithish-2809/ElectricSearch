import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

export class WorkerPool {
  constructor() {
    this.workerCount = Math.max(1, os.cpus().length - 1);

    this.workers = [];
    this.idleWorkers = [];
    this.queue = [];
    this.activeTasks = 0;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const workerPath = path.join(__dirname, "OCRWorker.js");

    for (let i = 0; i < this.workerCount; i++) {
      const worker = new Worker(workerPath);

      worker.on("message", (result) => {
        this.activeTasks--;

        this.idleWorkers.push(worker);

        this.processQueue();

        if (this.queue.length === 0 && this.activeTasks === 0) {
          this.resolve?.();
        }
      });

      worker.on("error", (error) => {
        console.error("Worker Error:", error);
      });

      worker.on("exit", (code) => {
        if (code !== 0) {
          console.error(`Worker exited with code ${code}`);
        }
      });

      this.workers.push(worker);
      this.idleWorkers.push(worker);
    }
  }

  processQueue() {
    while (this.idleWorkers.length > 0 && this.queue.length > 0) {
      const worker = this.idleWorkers.shift();
      const image = this.queue.shift();
      this.activeTasks++;
      worker.postMessage(image);
    }
  }

  indexImages(images) {
    return new Promise((resolve) => {
      this.resolve = resolve;

      this.queue.push(...images);

      this.processQueue();
    });
  }

  async terminate() {
    await Promise.all(
        this.workers.map((worker) => worker.terminate())
    );

    this.workers = [];
    this.idleWorkers = [];
    this.queue = [];
  }
}
