import { startIndexing } from "../services/IndexingService.js";

export async function handlePickFolder() {
    const folder = await pickFolder();

    if (!folder) return null;

    return await startIndexing(folder);
}