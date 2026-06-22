import tesseract from "node-tesseract-ocr";

export async function extractText(imagePath) {
    const text = await tesseract.recognize(imagePath);
    return text;
}