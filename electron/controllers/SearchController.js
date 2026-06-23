import { searchImages } from "../services/IndexingService.js";

export async function handleSearch(event, query) {
    return await searchImages(query);
}