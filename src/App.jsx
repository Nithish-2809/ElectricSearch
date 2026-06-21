import { useState } from "react";

function App() {
  const [folderPath, setFolderPath] = useState("");

  const handlePickFolder = async () => {
    const folder = await window.electron.pickFolder();

    if (folder) {
      setFolderPath(folder);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>ElectricSearch</h1>

      <button onClick={handlePickFolder}>
        Pick Folder
      </button>

      {folderPath && (
        <p>
          <strong>Selected Folder:</strong> {folderPath}
        </p>
      )}
    </div>
  );
}

export default App;