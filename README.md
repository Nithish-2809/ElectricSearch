# ElectricSearch

ElectricSearch is a production-oriented offline screenshot search engine
for Windows built with Electron. It indexes screenshots locally using
OCR, stores searchable metadata in SQLite, and provides both exact
full-text search and AI-powered semantic search without requiring an
internet connection.

## Features

### Core Features

-   Offline screenshot indexing
-   Recursive folder scanning
-   Native OCR using Tesseract
-   SQLite database
-   SQLite FTS5 full-text search
-   Offline semantic search using transformer embeddings
-   Multi-threaded OCR using Worker Threads
-   Folder watching with automatic indexing
-   Preview panel
-   Open image in system viewer
-   Progress tracking
-   Automatic restoration of watched folders

## Search Modes

### Exact Search

Uses SQLite FTS5 for keyword search.

### AI Search

Uses Xenova/bge-small-en-v1.5 embeddings and cosine similarity to search
by meaning.

## Tech Stack

-   Electron
-   React
-   Vite
-   Node.js
-   SQLite
-   SQLite FTS5
-   node-tesseract-ocr
-   Tesseract OCR
-   @xenova/transformers
-   Xenova/bge-small-en-v1.5
-   chokidar
-   Worker Threads

## Architecture

``` text
React
   │
Preload
   │
IPC
   │
Controllers
   │
Services
   │
Repositories
   │
SQLite / OCR / AI / File System
```

Renderer never accesses Node.js directly.

## Project Structure

``` text
electron/
├── controllers
├── database
├── ipc
├── services
├── utils
├── workers
├── preload.cjs
├── main.js

src/
├── components
├── pages
├── styles
```

## Database

### indexed_folders

-   id
-   path
-   added_at

### images

-   id
-   folder_id
-   path
-   file_name
-   extension
-   ocr_text
-   indexed_at

### image_embeddings

-   image_id
-   embedding (JSON)

### images_fts

SQLite FTS5 virtual table.

## Indexing Pipeline

``` text
Folder
   │
Recursive Scan
   │
Save Image Metadata
   │
Worker Pool
   │
OCR
   │
Save OCR
   │
Generate Embedding
   │
Save Embedding
```

## AI Pipeline

``` text
Screenshot
    │
OCR
    │
Text
    │
BGE Embedding
    │
384-D Vector
    │
SQLite
```

## Search Pipeline

### Exact Search

``` text
Query
  │
FTS5
  │
Results
```

### AI Search

``` text
Query
   │
Embedding
   │
Load Stored Embeddings
   │
Cosine Similarity
   │
Rank
   │
Results
```

## Worker Pool

OCR is parallelized using Node.js Worker Threads for improved indexing
throughput while keeping the UI responsive.

## Folder Watcher

Uses chokidar to monitor:

-   Added images
-   Deleted images
-   Modified images
-   Added folders
-   Deleted folders

Watchers are restored automatically on startup.

## Security

-   contextIsolation enabled
-   nodeIntegration disabled
-   Secure preload bridge

## Installation

``` bash
git clone https://github.com/<your-username>/ElectricSearch.git
cd ElectricSearch
npm install
```

Run:

``` bash
npm run dev
```

Start Electron:

``` bash
npm run electron
```

## Packaging

Production package should bundle:

-   Electron
-   SQLite
-   Tesseract OCR
-   BGE model

No internet connection or external APIs are required.

## Future Improvements

-   Hybrid search
-   Thumbnail cache
-   GPU inference
-   Cross-platform support
-   Auto updates


