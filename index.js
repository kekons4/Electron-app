const { app, BrowserWindow, Menu, MenuItem, Notification } = require('electron');
const path = require('path');
const io = require('socket.io-client');

let mainWindow;
const page = './src/index.html';

let isFocused = true;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: __dirname + '/utils/images/icon.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    mainWindow.on('focus', () => {
        // showNotification();
        isFocused = true;
    });

    mainWindow.on('blur', () => {
        // showNotification();
        isFocused = false;
    });

    mainWindow.loadFile(page);
}

const NOTIFICATION_TITLE = 'Kreios Chat has Started'
const NOTIFICATION_BODY = 'Enjoy your chatting experience.'

function showNotification(username, msg) {
    if(isFocused === false){
        new Notification({ title: username, body: msg }).show();
    }
}

//Create Main Menu
const mainMenu = new Menu();

//Add Main Menu item with help page
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
}).then(showNotification);

// When app is being closed 
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
});
