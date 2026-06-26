import { useEffect, useState } from "react";
import "../../styles/FolderList.css";

export default function FolderList() {
  const [folders, setFolders] = useState([]);

  async function loadFolders() {
    const data = await window.electron.getIndexedFolders();
    setFolders(data);
  }

  async function handleAddFolder() {
    const result = await window.electron.pickFolder();
    if (!result) return;
    setFolders(prev => [result.folder, ...prev]);
  }

  async function handleDeleteFolder(id) {
    await window.electron.deleteFolder(id);
    setFolders(prev => prev.filter(f => f.id !== id));
  }

  useEffect(() => { loadFolders(); }, []);

  return (
    <div className="folders-panel">
      {/* Header */}
      <div className="folders-header">
        <div className="folders-header-label">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          Folders
        </div>
        <button className="add-folder-btn" onClick={handleAddFolder}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add folder
        </button>
      </div>

      {/* List */}
      <div className="folders-list">
        {folders.length === 0 ? (
          <div className="empty-folders">
            <span className="empty-folders-icon">📁</span>
            <p className="empty-folders-title">No folders added yet</p>
            <p className="empty-folders-hint">Click "Add folder" to start indexing your screenshots</p>
          </div>
        ) : (
          <>
            <p className="folders-count">{folders.length} folder{folders.length !== 1 ? "s" : ""} indexed</p>
            {folders.map(folder => (
              <div key={folder.id} className="folder-card">
                <div className="folder-info">
                  <span className="folder-icon">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                  <span className="folder-name" title={folder.path}>
                    {folder.path.split(/[\\/]/).pop()}
                  </span>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteFolder(folder.id)}
                  title="Remove this folder"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4h6v2" />
                  </svg>
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}