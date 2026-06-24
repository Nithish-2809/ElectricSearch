import { useState, useEffect } from "react";

import "../styles/Home.css";

import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import FolderList from "../components/FolderList/FolderList";
import ResultGrid from "../components/ResultGrid/ResultGrid";
import PreviewPanel from "../components/PreviewPanel/PreviewPanel";

export default function Home() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        async function search() {
            if (!query.trim()) {
                setResults([]);
                setSelectedImage(null);
                return;
            }

            const data = await window.electron.searchImages(query);
            setResults(data);

            if (data.length > 0) {
                setSelectedImage(data[0]);
            } else {
                setSelectedImage(null);
            }
        }

        search();
    }, [query]);

    return (
        <div className="app-container">
            <Header />

            <SearchBar
                query={query}
                setQuery={setQuery}
            />

            <div className="content">
                <FolderList />

                <ResultGrid
                    results={results}
                    onSelect={setSelectedImage}
                    selectedImage={selectedImage}
                />

                <PreviewPanel
                    image={selectedImage}
                />
            </div>
        </div>
    );
}