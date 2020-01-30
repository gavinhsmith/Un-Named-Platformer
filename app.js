const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Notification = electron.Notification;
const ipcMain = electron.ipcMain;
const path = require('path');
const modalPath = path.join('file://', __dirname, 'game/index.html');

app.on('ready',function () {
  let win = new BrowserWindow({
    width: 1000,
    height: 526,
    resizable: false,
    //fullscreen: false,
    //icon: path.join(__dirname, 'icon/icon.ico'),
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.setMenu(null);
  win.on('close', () => {win = null});
  win.loadURL(modalPath);
  win.show();
});

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.reply('asynchronous-reply', 'pong')
});

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg) // prints "ping"
  event.returnValue = 'pong'
});
