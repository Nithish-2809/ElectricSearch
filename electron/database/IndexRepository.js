import { connectDatabase } from "./database.js";
// IndexRepository.js
export async function saveOCRText(imageId, text) {
    const db = await connectDatabase();

    await db.run(
        `UPDATE images SET ocr_text = ? WHERE id = ?`,
        [text, imageId]
    );

    await db.run(
        `INSERT INTO images_fts(rowid, ocr_text)
         SELECT id, ocr_text FROM images WHERE id = ?`,
        [imageId]
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