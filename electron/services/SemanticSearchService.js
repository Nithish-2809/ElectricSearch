import { generateEmbedding } from "./EmbeddingService.js";
import { getAllEmbeddings } from "../database/IndexRepository.js";
import { cosineSimilarity } from "../utils/similarity.js";

export async function semanticSearch(query) {
    const queryEmbedding = await generateEmbedding(query, true);

    const images = await getAllEmbeddings();

    const results = [];

    for (const image of images) {
        const embedding = JSON.parse(image.embedding);

        const score = cosineSimilarity(
            queryEmbedding,
            embedding
        );

        results.push({
            ...image,
            score,
        });
    }

    results.sort((a, b) => b.score - a.score);
    
    return results.slice(0, 25);
}