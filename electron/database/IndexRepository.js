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