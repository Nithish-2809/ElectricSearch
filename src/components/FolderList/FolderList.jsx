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

        setFolders(prev =>
            prev.filter(folder => folder.id !== id)
        );
    }

    useEffect(() => {
        loadFolders();
    }, []);

    return (
        <div className="folders-panel">

            <div className="folders-header">
                <h3>Folders</h3>

                <button onClick={handleAddFolder}>
                    + Add
                </button>
            </div>

            <div className="folders-list">
                {folders.length === 0 ? (
                    <p className="empty-folders">No folders indexed.</p>
                ) : (
                    folders.map(folder => (
                        <div
                            key={folder.id}
                            className="folder-card"
                        >
                            <div className="folder-info">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                                </svg>
                                <span>{folder.path.split("\\").pop()}</span>
                            </div>

                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteFolder(folder.id)}
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