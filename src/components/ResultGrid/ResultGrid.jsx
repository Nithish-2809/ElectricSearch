import "../../styles/ResultGrid.css";

export default function ResultGrid({ results, onSelect, selectedImage }) {

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
                    className={`result-card${selectedImage?.id === image.id ? " selected" : ""}`}
                    onClick={() => onSelect(image)}
                >
                    <img
                        src={`electricsearch://image?path=${encodeURIComponent(image.path)}`}
                        className="thumbnail"
                        alt={image.file_name}
                    />

                    <h4>{image.file_name}</h4>
                </div>
            ))}

        </div>
    );
}