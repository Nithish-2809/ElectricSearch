import { connectDatabase } from "./database.js";

export async function saveOCRText(imagePath, text) {
    const db = await connectDatabase();

    await db.run(
        `
        UPDATE images
        SET ocr_text = ?
        WHERE path = ?
        `,
        [text, imagePath]
    );
}

export async function searchOCR(query) {
    const db = await connectDatabase();

    return await db.all(
        `
        SELECT images.*
        FROM images_fts
        JOIN images
            ON images.id = images_fts.rowid
        WHERE images_fts MATCH ?
        `,
        [query]
    );
}