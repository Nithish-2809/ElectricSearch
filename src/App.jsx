import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [folders, setFolders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  async function loadFolders() {
    const data = await window.electron.getIndexedFolders();
    setFolders(data);
  }

  async function handlePickFolder() {
    await window.electron.pickFolder();
    loadFolders();
  }

  async function handleDelete(id) {
    await window.electron.deleteFolder(id);
    loadFolders();
  }

  useEffect(() => {
    loadFolders();

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("es-search-input")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="es-root">

      {/* Header */}
      <div className="es-header">
        <div className="es-logo">
          <div className="es-logo-icon" aria-hidden="true">⚡</div>
          <h1 className="es-title">
            Electric<span>Search</span>
          </h1>
        </div>
        <span className="es-badge">Beta</span>
      </div>

      {/* Search bar */}
      <div className="es-search-bar">
        <span className="es-search-icon" aria-hidden="true">🔍</span>
        <input
          id="es-search-input"
          type="text"
          placeholder="Search across all indexed folders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search files"
        />
        <kbd className="es-kbd">⌘ K</kbd>
      </div>

      {/* Stats */}
      <div className="es-stats">
        <div className="es-stat">
          <span className="es-stat-label">Folders</span>
          <span className="es-stat-val accent">{folders.length}</span>
        </div>
        <div className="es-stat">
          <span className="es-stat-label">Files</span>
          <span className="es-stat-val">—</span>
        </div>
        <div className="es-stat">
          <span className="es-stat-label">Indexed</span>
          <span className="es-stat-val">—</span>
        </div>
      </div>

      {/* Section header */}
      <div className="es-section-header">
        <span className="es-section-title">Indexed Folders</span>
        <button className="es-add-btn" onClick={handlePickFolder}>
          <span aria-hidden="true">📁</span>
          Add Folder
        </button>
      </div>

      {/* Folder list */}
      <div className="es-folders">
        {folders.length === 0 ? (
          <div className="es-empty">
            <div className="es-empty-icon" aria-hidden="true">⚡</div>
            <p className="es-empty-text">
              No folders indexed yet.<br />
              Add a folder to start searching at the speed of electricity.
            </p>
          </div>
        ) : (
          folders.map((folder) => (
            <div className="es-folder-item" key={folder.id}>
              <div className="es-folder-icon" aria-hidden="true">📂</div>
              <div className="es-folder-info">
                <div className="es-folder-path" title={folder.path}>
                  {folder.path}
                </div>
                <div className="es-folder-meta">
                  {folder.lastSynced
                    ? `Last synced · ${folder.lastSynced}`
                    : "Ready to index"}
                </div>
              </div>
              <div className={`es-folder-status ${folder.status === "indexing" ? "indexing" : "indexed"}`}>
                <span className="es-status-dot" />
                {folder.status === "indexing" ? "Indexing" : "Indexed"}
              </div>
              <button
                className="es-delete-btn"
                onClick={() => handleDelete(folder.id)}
                aria-label={`Remove ${folder.path}`}
                title="Remove folder"
              >
                🗑
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;