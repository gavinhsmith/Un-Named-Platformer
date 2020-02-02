const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Notification = electron.Notification;
const ipcMain = electron.ipcMain;
const path = require('path');
const fs = require('fs');
const ImageDataURI = require('image-data-uri');

const modalPath = path.join('file://', __dirname, 'game/index.html');

const SyncEmitter = class {
  constructor(name) {
    this.name = name;
  }
  on(callback) {
    ipcMain.on(this.name, (event, arg) => {
      event.returnValue = callback(arg);
    });
  }
};
const AsyncEmitter = class {
  constructor(name) {
    this.name = name;
  }
  on(callback) {
    ipcMain.on(this.name, (event, arg) => {
      this.emit(event.sender,callback(arg));
    });
  }
  emit(sender,data) {
    sender.send(this.name,data);
  }
};

app.on('ready',function () {
  let win = new BrowserWindow({
    width: 1000,
    height: 526,
    resizable: false,
    //fullscreen: false,
    //icon: path.join(__dirname, 'icon/icon.ico'),
    icon: path.join(__dirname, 'icon/icon.ico'),
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.setMenu(null);
  win.on('close', () => {win = null});
  win.loadURL(modalPath);
  win.show();
});

var gsc = new SyncEmitter('getspritecashe');
gsc.on(function () {
  return JSON.parse(fs.readFileSync('spritecashe.json'));
});

var usc = new AsyncEmitter('updatespritecashe');
usc.on(function (data) {
  var writedata = JSON.stringify(data);
  fs.writeFileSync('spritecashe.json',writedata,'utf8');
  return null;
});
