import { parentPort } from "worker_threads";

import OCRService from "../services/OCRService.js";
import IndexRepository from "../database/IndexRepository.js";

parentPort.on("message", async (image) => {
    try {
        const ocrText = await OCRService.extractText(image.path);

        await IndexRepository.saveOCRText(image.id, ocrText);

        parentPort.postMessage({
            success: true,
            imageId: image.id,
        });
    } catch (error) {
        parentPort.postMessage({
            success: false,
            imageId: image.id,
            error: error.message,
        });
    }
});