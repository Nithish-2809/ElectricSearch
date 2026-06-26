import "../../styles/Search.css";

export default function SearchBar({ query, setQuery, searchMode, setSearchMode }) {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <span className="search-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>

        <input
          type="text"
          placeholder={
            searchMode === "fts"
              ? "Type any word from the image text…"
              : "Describe what you're looking for…"
          }
          className="search-input"
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />

        <div className="mode-toggle">
          <button
            className={`mode-btn ${searchMode === "fts" ? "active" : ""}`}
            onClick={() => setSearchMode("fts")}
            title="Text search — finds exact words in your screenshots"
          >
            Text
          </button>
          <button
            className={`mode-btn ${searchMode === "ai" ? "ai-active" : ""}`}
            onClick={() => setSearchMode("ai")}
            title="AI search — understands meaning, not just exact words"
          >
            AI
          </button>
        </div>
      </div>
    </div>
  );
}