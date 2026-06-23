import "../../styles/ResultGrid.css";

export default function ResultGrid({ results }) {

    if (results.length === 0) {
        return (
            <div className="results-panel">
                <div className="empty-results">
                    🔍 Start typing to search screenshots...
                </div>
            </div>
        );
    }

    return (
        <div className="results-panel">

            {results.map((image) => (
                <div
                    key={image.id}
                    className="result-card"
                >
                <img
    src={image.path}
    alt={image.file_name}
    className="thumbnail"
/>
                    <h4>{image.file_name}</h4>

                    <p>
                        {image.ocr_text?.substring(0, 180)}...
                    </p>
                </div>
            ))}

        </div>
    );
}