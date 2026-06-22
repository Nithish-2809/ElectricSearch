import { useState } from "react";

function App() {
  const [images, setImages] = useState([]);
  const [folder, setFolder] = useState("");

  async function handlePickFolder() {
    const result = await window.electron.pickFolder();

    if (!result) return;

    setFolder(result.folder);
    setImages(result.images);
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>ElectricSearch</h1>

      <button onClick={handlePickFolder}>
        Pick Folder
      </button>

      <h3>{folder}</h3>

      <h3>Images Found: {images.length}</h3>

      <ul>
        {images.map((image) => (
          <li key={image}>{image}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;