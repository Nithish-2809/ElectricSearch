import { useState } from "react";

function App() {
  const [folder, setFolder] = useState("");
  const [imageCount, setImageCount] = useState(0);

  async function handlePickFolder() {
    const result = await window.electron.pickFolder();

    if (!result) return;

    setFolder(result.folder.path);
    setImageCount(result.imageCount);
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>ElectricSearch</h1>

      <button onClick={handlePickFolder}>
        Add Folder
      </button>

      {folder && (
        <>
          <h3>Selected Folder</h3>
          <p>{folder}</p>

          <h3>Images Found: {imageCount}</h3>
        </>
      )}
    </div>
  );
}

export default App;