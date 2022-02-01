const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const path = require('path');
const io = require('socket.io-client');

console.log(__dirname);
let mainWindow;
const page = './src/index.html';

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    mainWindow.loadFile(page);
}

//Create Main Menu
const mainMenu = new Menu();

// Add Main Menu item with help page
mainMenu.append(new MenuItem({
    label: 'Electron',
    submenu: [{
        role: 'help',
        accelerator: process.platform === 'darwin' ? 'Cmd+H' : 'Control+H',
        click() {
            console.log('Keeks');
            mainWindow.loadFile('./src/test.html');
        }
    }]
}));

// Add Dev tools Menu Item
mainMenu.append(new MenuItem({
    label: 'Developer Tools',
    submenu: [
        {
            role: 'toggleDevTools',
            accelerator: process.platform === 'darwin' ? 'Cmd+Shift+I' : 'Control+Shift+I',
            click() {
                console.log('Opening Dev Tools');
                if(process.NODE_ENV !== 'production') {
                    mainWindow.webContents.openDevTools();
                }
            }
        },
        {
            role: 'Reload',
            accelerator: process.platform === 'darwin' ? 'Cmd+R' : 'Control+R',
            click() {
                console.log('Refreshing Application...');
                mainWindow.webContents.reload();
            }
        }]
}))

// Applies Menu to the App
Menu.setApplicationMenu(mainMenu);

// When electron is ready
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// When app is being closed 
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
});