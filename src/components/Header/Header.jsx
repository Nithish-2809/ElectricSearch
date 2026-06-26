import "../../styles/Header.css";

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header className="header">
      {/* Brand */}
      <div className="header-brand">
        <div className="header-logo">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <polygon
              points="13,2 3,14 12,14 11,22 21,10 12,10"
              fill="none"
              stroke="#00d4f5"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="header-title">
          Electric<span>Search</span>
        </span>
      </div>

      {/* Tab bar */}
      <nav className="header-tabs">
        <button
          className={`header-tab ${activeTab === "search" ? "active" : ""}`}
          onClick={() => setActiveTab("search")}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Search
        </button>

        <button
          className={`header-tab ${activeTab === "guide" ? "active" : ""}`}
          onClick={() => setActiveTab("guide")}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          How it works
        </button>
      </nav>
    </header>
  );
}