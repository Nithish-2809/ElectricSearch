import fs from "fs/promises";
import path from "path";
import { connectDatabase } from "../database/database.js";

const IMAGE_EXTENSIONS = [
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".bmp"
];

export async function getImagesFromFolder(folderPath) {
    const images = [];

    async function scanDirectory(currentPath) {
        const entries = await fs.readdir(currentPath, {
            withFileTypes: true
        });

        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);

            if (entry.isDirectory()) {
                await scanDirectory(fullPath);
            } 
            else if (
                IMAGE_EXTENSIONS.includes(
                    path.extname(entry.name).toLowerCase()
                )
            ) {
                images.push(fullPath);
            }
        }
    }

    await scanDirectory(folderPath);

    return images;
}

export async function saveImages(folderId, images) {
    const db = await connectDatabase();
    console.log("Saving", images.length, "images");
    const query = `
        INSERT OR IGNORE INTO images
        (folder_id, path, file_name, extension)
        VALUES (?, ?, ?, ?)
    `;

    for (const imagePath of images) {
        await db.run(query, [
            folderId,
            imagePath,
            path.basename(imagePath),
            path.extname(imagePath).toLowerCase()
        ]);
    }
}