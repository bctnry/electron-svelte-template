import * as path from 'path';
import * as electron from 'electron';

function createWindow() {
    let win = new electron.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile(path.join(__dirname, '..', 'RenderProcess', 'index.html'));
}

electron.app.whenReady().then(() => {
    createWindow();
    electron.app.on('activate', () => {
        if (electron.BrowserWindow.getAllWindows().length <= 0) {
            createWindow();
        }
    })
});

electron.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') { electron.app.quit(); }
});


