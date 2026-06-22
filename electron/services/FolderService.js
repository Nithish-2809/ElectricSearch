import { dialog } from "electron";
import { connectDatabase } from "../database/database.js";

export async function pickFolder() {
    const result = await dialog.showOpenDialog({
        properties: ["openDirectory"]
    });

    if (result.canceled) {
        return null;
    }

    return result.filePaths[0];
}

export async function saveFolder(folderPath) {
    const db = await connectDatabase();

    await db.run(
        `INSERT OR IGNORE INTO indexed_folders (path) VALUES (?)`,
        [folderPath]
    );

    return folderPath;
}

export async function getIndexedFolders() {
    const db = await connectDatabase();

    return await db.all(
        `SELECT * FROM indexed_folders ORDER BY added_at DESC`
    );
}

export async function deleteFolder(id) {
    const db = await connectDatabase();

    await db.run(
        `DELETE FROM indexed_folders WHERE id = ?`,
        [id]
    );
}