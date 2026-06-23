import { pathToFileURL } from "url";

export async function handleGetImageUrl(_, imagePath) {
    return pathToFileURL(imagePath).href;
}