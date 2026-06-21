import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  const handlePing = async () => {
    const response = await window.electron.ping();
    setMessage(response);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>ElectricSearch</h1>

      <button onClick={handlePing}>
        Ping Electron
      </button>

      <p>{message}</p>
    </div>
  );
}

export default App;