import { pipeline } from "@xenova/transformers";

let embedder = null;

function cleanOCRText(text) {
    return text
        .replace(/[^\w\s.,!?'-]/g, ' ')  // strip garbage chars
        .replace(/\s+/g, ' ')             // collapse whitespace
        .trim()
        .toLowerCase();
}


async function getEmbedder() {
    if (embedder) {
        return embedder;
    }

    console.log("Loading embedding model...");

    embedder = await pipeline(
        "feature-extraction",
        "Xenova/bge-small-en-v1.5" 
    );

    console.log("Embedding model loaded.");

    return embedder;
}

export async function generateEmbedding(text, isQuery = false) {
    const extractor = await getEmbedder();
    const input = isQuery
        ? `Represent this sentence for searching relevant passages: ${text}`
        : text;

    const output = await extractor(input, {
        pooling: "mean",
        normalize: true,
    });
    return Array.from(output.data);
}