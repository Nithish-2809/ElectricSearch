import { pickFolder } from "../services/FolderService.js";

export async function handlePickFolder() {
    return await pickFolder();
}