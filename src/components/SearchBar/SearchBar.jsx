import "../../styles/Search.css";

export default function SearchBar({ query, setQuery }) {
    return (
        <div className="search-container">
            <div className="search-wrapper">
                <span className="search-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </span>

                <input
                    type="text"
                    placeholder="Search screenshots..."
                    className="search-input"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />

                <div className="search-kbd">
                    <span>⌘</span><span>K</span>
                </div>
            </div>
        </div>
    );
}