import { useState, useEffect } from "react";
import "../styles/Home.css";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import FolderList from "../components/FolderList/FolderList";
import ResultGrid from "../components/ResultGrid/ResultGrid";
import PreviewPanel from "../components/PreviewPanel/PreviewPanel";

export default function Home() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [progress, setProgress] = useState({
    completed: 0,
    total: 0,
    percentage: 0,
  });
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    window.electron.onIndexingProgress((progressData) => {
      setProgress(progressData);
      setShowProgress(true);

      // hide bar 2s after completion
      if (progressData.percentage >= 100) {
        setTimeout(() => setShowProgress(false), 2000);
      }
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    async function search() {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setSelectedImage(null);
        return;
      }
      try {
        const data = await window.electron.searchImages(debouncedQuery);
        setResults(data);
        setSelectedImage(data.length > 0 ? data[0] : null);
      } catch (err) {
        console.error("Search failed:", err);
        setResults([]);
        setSelectedImage(null);
      }
    }
    search();
  }, [debouncedQuery]);

  return (
    <div className="app-container">
      <Header />

      {showProgress && (
        <div className={`indexing-progress ${progress.percentage >= 100 ? "done" : ""}`}>
          <div className="indexing-progress-top">
            <div className="indexing-label">
              {progress.percentage >= 100 ? (
                <>
                  <span className="indexing-dot done-dot" />
                  Indexing complete
                </>
              ) : (
                <>
                  <span className="indexing-dot active-dot" />
                  Indexing images…
                </>
              )}
            </div>
            <span className="indexing-count">
              {progress.completed} / {progress.total}
              <span className="indexing-pct"> — {progress.percentage}%</span>
            </span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>
      )}

      <SearchBar query={query} setQuery={setQuery} />

      <div className="content">
        <FolderList />
        <ResultGrid
          results={results}
          onSelect={setSelectedImage}
          selectedImage={selectedImage}
        />
        <PreviewPanel image={selectedImage} />
      </div>
    </div>
  );
}