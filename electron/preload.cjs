const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    pickFolder: () => ipcRenderer.invoke("pick-folder"),

    getIndexedFolders: () =>
        ipcRenderer.invoke("get-indexed-folders"),

    deleteFolder: (id) =>
        ipcRenderer.invoke("delete-folder", id),

    searchImages: (query) =>
        ipcRenderer.invoke("search-images", query),

    openImage: (imagePath) => 
        ipcRenderer.invoke("open-image", imagePath),

    onIndexingProgress: (callback) =>
        ipcRenderer.on("indexing-progress", (_, progress) => {
            callback(progress);
        }),

});