import { useEffect, useState } from "react";
import "../../styles/FolderList.css"

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

            {
                folders.length === 0 ? (
                    <p>No folders indexed.</p>
                ) : (
                    folders.map(folder => (
                        <div
                            key={folder.id}
                            className="folder-card"
                        >
                            <div className="folder-info">
                                📁 {folder.path.split("\\").pop()}
                            </div>

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    handleDeleteFolder(folder.id)
                                }
                            >
                                🗑
                            </button>
                        </div>
                    ))
                )
            }

        </div>
    );
}