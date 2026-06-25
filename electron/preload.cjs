// preload.cjs

const { contextBridge, ipcRenderer } = require("electron");

// ✅ Register ONCE at preload load time, before the page even mounts
ipcRenderer.on("indexing-progress", (_, progress) => {
    if (typeof progressCallback === "function") {
        progressCallback(progress);
    }
});

let progressCallback = null;

contextBridge.exposeInMainWorld("electron", {
    pickFolder: () => ipcRenderer.invoke("pick-folder"),
    getIndexedFolders: () => ipcRenderer.invoke("get-indexed-folders"),
    deleteFolder: (id) => ipcRenderer.invoke("delete-folder", id),
    searchImages: (query) => ipcRenderer.invoke("search-images", query),
    openImage: (imagePath) => ipcRenderer.invoke("open-image", imagePath),

    // ✅ Just sets the callback — no new ipcRenderer.on every call
    onIndexingProgress: (callback) => {
        progressCallback = callback;
    },
});