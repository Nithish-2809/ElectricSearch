import { searchImages } from "../services/IndexingService.js";
import { shell } from "electron";

export async function handleSearch(event, query) {
    return await searchImages(query);
}

export async function openImage(_, imagePath) {
    await shell.openPath(imagePath);
}