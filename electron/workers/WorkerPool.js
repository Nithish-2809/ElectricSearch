import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";
import { saveOCRText } from "../database/IndexRepository.js";
import { getMainWindow } from "../WindowManager.js";

export class WorkerPool {
  constructor() {
    this.workerCount = Math.max(1, os.cpus().length - 1);

    this.workers = [];
    this.idleWorkers = [];
    this.queue = [];

    this.activeTasks = 0;
    this.pendingWrites = 0; // tracks in-flight saveOCRText calls
    this.totalTasks = 0;
    this.completedTasks = 0;

    // Queue of { resolve } for sequential indexImages callers
    this.pendingBatches = [];

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const workerPath = path.join(__dirname, "OCRWorker.js");

    for (let i = 0; i < this.workerCount; i++) {
      const worker = new Worker(workerPath);

      worker.on("message", async (result) => {
        // Decrement active tasks immediately so processQueue can proceed
        this.activeTasks--;
        this.idleWorkers.push(worker);
        this.processQueue();

        // Track the DB write separately so we don't resolve too early
        this.pendingWrites++;
        try {
          if (result.success) {
            await saveOCRText(result.imageId, result.ocrText);
          }
        } catch (err) {
          console.error("saveOCRText failed:", err);
        } finally {
          this.pendingWrites--;
          this.completedTasks++;

          const mainWindow = getMainWindow();
          mainWindow?.webContents.send("indexing-progress", {
            completed: this.completedTasks,
            total: this.totalTasks,
            percentage: Math.round(
              (this.completedTasks / this.totalTasks) * 100
            ),
          });

          // Only settle when the queue, active workers, AND all DB writes are done
          this.tryResolve();
        }
      });

      worker.on("error", (error) => {
        console.error("Worker Error:", error);
        // Still need to recover the worker so the pool doesn't deadlock
        this.activeTasks--;
        this.pendingWrites--;
        this.completedTasks++;
        this.idleWorkers.push(worker);
        this.processQueue();
        this.tryResolve();
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

  tryResolve() {
    if (this.queue.length > 0 || this.activeTasks > 0 || this.pendingWrites > 0) {
      return; // still work to do
    }

    // Drain all waiting batch promises — every caller that queued work gets resolved
    while (this.pendingBatches.length > 0) {
      const { resolve } = this.pendingBatches.shift();
      resolve();
    }

    // Reset counters only after resolving, so .then() handlers see clean state
    this.totalTasks = 0;
    this.completedTasks = 0;
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
    if (images.length === 0) return Promise.resolve();

    return new Promise((resolve) => {
      this.pendingBatches.push({ resolve });
      this.totalTasks += images.length;
      this.queue.push(...images);
      this.processQueue();
    });
  }

  async terminate() {
    await Promise.all(this.workers.map((worker) => worker.terminate()));
    this.workers = [];
    this.idleWorkers = [];
    this.queue = [];
    this.pendingBatches = [];
  }
}

const workerPool = new WorkerPool();

export default workerPool;