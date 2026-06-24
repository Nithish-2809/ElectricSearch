import { parentPort } from "node:worker_threads";
import { extractText } from "../services/OCRService.js";

parentPort.on("message", async (image) => {
    try {
        const ocrText = await extractText(image.path);

        parentPort.postMessage({
            success: true,
            imageId: image.id,
            ocrText,
        });
    } catch (error) {
        parentPort.postMessage({
            success: false,
            imageId: image.id,
            error: error.message,
        });
    }
});