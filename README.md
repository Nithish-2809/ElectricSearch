====>> ElectricSearch

An offline AI-powered screenshot search engine for Windows.

Search thousands of screenshots in milliseconds using OCR, Full-Text Search, and Semantic AI — all completely offline.

=====>Features
Smart Folder Indexing
Index one or multiple folders.
Recursive image discovery.
Supports nested directories.
Automatic duplicate prevention.
Background indexing.
Image Support

Supports:

PNG
JPG
JPEG
WEBP
BMP
 Native OCR
Native Tesseract OCR
Offline text extraction
High-speed indexing
Multi-language ready
One-time indexing
Parallel OCR Engine
Dynamic Worker Pool
Multi-core processing
CPU-aware scheduling
Responsive UI during indexing
Scales according to available hardware
SQLite Database

Stores:

Indexed folders
Image metadata
OCR text
AI embeddings

Uses:

Foreign Keys
Cascade Deletes
Optimized queries
Full Text Search (FTS5)

Lightning-fast text search.

Examples:

passport

leetcode

react hooks

binary tree

invoice

aadhaar

Results appear in milliseconds.

Offline Semantic AI Search

Search by meaning instead of exact words.

Examples

Search:

identity proof

Returns

Passport
Aadhaar
PAN Card

Search

college notes

Returns

DBMS
OS
DSA
CN notes

Search

coding interview

Returns

LeetCode
GeeksForGeeks
InterviewBit
Codeforces

No internet.

No API.

Runs entirely on-device.

Thumbnail Preview
Instant thumbnail loading
Visual search experience
Responsive result cards
Preview Panel

Click any result to

View large image
Read OCR text
Navigate between results
Open Image

Double click any result.

ElectricSearch opens the image using the system's default application.

Live Indexing Progress

Background indexing with

█████████████░░░░░░░

67%

1345 / 2000 Images
Folder Watcher

Automatically detects

New screenshots
Deleted images
Renamed files

Updates the index without user intervention.

Completely Offline

No cloud.

No external APIs.

No user data leaves the computer.

Architecture
React UI

        │

        ▼

Electron Preload

        │

        ▼

Electron Main

        │

        ▼

Controllers

        │

        ▼

Services

        │

        ├──────────────┐
        ▼              ▼

SQLite         File System

        │              │

        ▼              ▼

FTS5        Native OCR

        │

        ▼

AI Embeddings
Tech Stack
Frontend
React
Vite
CSS
Desktop
Electron
Backend
Node.js
Database
SQLite
SQLite FTS5
OCR
Native Tesseract OCR
AI
Local Embedding Model
Offline Semantic Search
Performance
Tested On
Thousands of screenshots
Recursive folder indexing
Fully offline search
Search Speed
Feature	Speed
FTS Search	5–20 ms
Semantic Search	30–80 ms
Thumbnail Loading	Instant
Folder Watching	Real-time
Indexing
Parallel OCR
Worker Pool
Multi-core processing
Project Structure
ElectricSearch/

electron/

│
├── controllers/
├── services/
├── database/
├── ipc/
├── workers/
├── utils/
├── preload.cjs
└── main.js

src/

├── components/
├── pages/
├── hooks/
├── styles/
└── App.jsx
Security
Context Isolation Enabled
Node Integration Disabled
Secure IPC Communication
Custom Electron Protocol
Offline Processing
No Internet Required
Screenshots
Home
Search Results
Preview Panel
Indexing Progress
Folder Management
Future Scope
PDF OCR Support
Drag & Drop Indexing
Advanced Filters
Video Frame OCR
Cross-platform Support (Linux/macOS)
OCR Language Packs
Duplicate Image Detection
Image Tagging
Export / Import Index Database
Key Engineering Concepts Demonstrated
Electron Architecture
Secure IPC
MVC Pattern
SQLite
Repository Pattern
SQLite FTS5
Recursive File Discovery
Native OCR Integration
Worker Pool Architecture
Multi-core Processing
Background Jobs
Custom Electron Protocols
Offline AI Embeddings
Semantic Search
Desktop Application Security
