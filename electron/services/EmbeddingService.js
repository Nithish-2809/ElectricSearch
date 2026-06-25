import { pipeline } from "@xenova/transformers";

let embedder = null;

async function getEmbedder() {
    if (embedder) {
        return embedder;
    }

    console.log("Loading embedding model...");

    embedder = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2"
    );

    console.log("Embedding model loaded.");

    return embedder;
}

export async function generateEmbedding(text) {
    const extractor = await getEmbedder();

    const output = await extractor(text, {
        pooling: "mean",
        normalize: true,
    });

    return Array.from(output.data);
}