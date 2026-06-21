const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    pickFolder: () => ipcRenderer.invoke("pick-folder")
});