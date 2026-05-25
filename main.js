const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1100,
        height: 800,
        backgroundColor: '#06060a',
        title: "MI1 — Core Interface",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // Requerido para que renderer.js funcione directo
        }
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});