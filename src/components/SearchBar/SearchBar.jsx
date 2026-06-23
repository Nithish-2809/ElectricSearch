import "../../styles/Search.css";

export default function SearchBar({ query, setQuery }) {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="🔍 Search screenshots..."
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}