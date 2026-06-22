import fs from "fs/promises";
import path from "path";

const IMAGE_EXTENSIONS = [
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".bmp"
];

export async function getImagesFromFolder(folderPath) {
    const files = await fs.readdir(folderPath);

    return files.filter(file =>
        IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
    );
}