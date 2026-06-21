const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    pickFolder: () => ipcRenderer.invoke("pick-folder"),

    getIndexedFolders: () =>
        ipcRenderer.invoke("get-indexed-folders")
});