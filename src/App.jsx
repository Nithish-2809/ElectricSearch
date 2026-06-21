import { useEffect, useState } from "react";

function App() {
  const [folders, setFolders] = useState([]);

  async function loadFolders() {
    const data = await window.electron.getIndexedFolders();
    setFolders(data);
  }

  async function handlePickFolder() {
    await window.electron.pickFolder();
    loadFolders();
  }

  useEffect(() => {
    loadFolders();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>ElectricSearch</h1>

      <button onClick={handlePickFolder}>
        Add Folder
      </button>

      <h3>Indexed Folders</h3>

      <ul>
        {folders.map(folder => (
          <li key={folder.id}>
            {folder.path}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;