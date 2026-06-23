import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import FolderList from "../components/FolderList/FolderList";
import ResultGrid from "../components/ResultGrid/ResultGrid";
import PreviewPanel from "../components/PreviewPanel/PreviewPanel";
import { useState, useEffect } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function search() {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      const data = await window.electron.searchImages(query);
      setResults(data);
    }

    search();
  }, [query]);
  return (
    <div className="app-container">
      <Header />

      <SearchBar query={query} setQuery={setQuery} />
      <div className="content">
        <FolderList />

        <ResultGrid results={results} />

        <PreviewPanel />
      </div>
    </div>
  );
}
