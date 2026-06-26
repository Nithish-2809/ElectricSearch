import "../../styles/ResultGrid.css";

export default function ResultGrid({ results, onSelect, selectedImage, query }) {

  if (results.length === 0) {
    const hasQuery = query && query.trim().length > 0;
    return (
      <div className="results-panel">
        <div className="empty-results">
          <span className="empty-results-icon">{hasQuery ? "🔎" : "🖼️"}</span>
          <div className="empty-results-text">
            {hasQuery ? (
              <>
                <strong>No results found</strong>
                Try a different word, or switch to AI search for broader matches
              </>
            ) : (
              <>
                <strong>Your screenshots appear here</strong>
                Type in the search bar above to find images by their text content
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="results-panel">
      {/* Result count */}
      <div className="results-header">
        <span className="results-count">
          <strong>{results.length}</strong> result{results.length !== 1 ? "s" : ""}
        </span>
      </div>

      {results.map(image => (
        <div
          key={image.id}
          className={`result-card${selectedImage?.id === image.id ? " selected" : ""}`}
          onClick={() => onSelect(image)}
          onDoubleClick={() => window.electron.openImage(image.path)}
          title={`${image.file_name}\nDouble-click to open`}
        >
          <img
            src={`electricsearch://image?path=${encodeURIComponent(image.path)}`}
            className="thumbnail"
            alt={image.file_name}
          />
          <div className="card-footer">
            <span className="card-name">{image.file_name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}