import { dialog } from "electron";
//dialog is Electron's API for showing native operating system dialogs.(open file,folder etc....)

export async function pickFolder() {
    const result = await dialog.showOpenDialog({
        properties: ["openDirectory"]
    });

    if (result.canceled) {
        return null;
    }

    return result.filePaths[0];
}