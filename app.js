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

function ratioize(ratio,number) {
  return {
    top: ratio*number,
    bottom: number
  };
};

app.on('ready',function () {
  mainbw = new BrowserWindow({
    width: ratioize(1000/526,526).top,
    height: ratioize(1000/526,526).bottom,
    resizable: false,
    //fullscreen: false,
    //icon: path.join(__dirname, 'icon/icon.ico'),
    icon: path.join(__dirname, 'icon/icon.ico'),
    webPreferences: {
      nodeIntegration: true
    }
  });

  let win1 = mainbw;

  //win1.setMenu(null);
  win1.on('close', () => {win = null});
  win1.loadURL(modalPath);
  win1.show();
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
