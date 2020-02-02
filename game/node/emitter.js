AsyncEmitter = class {
  constructor(name) {
    this.name = name;
  }
  emit(data) {
    ipcRenderer.send(this.name,data);
  }
  on(callback) {
    ipcRenderer.on(this.name,callback);
  }
};
SyncEmitter = class {
  constructor(name) {
    this.name = name;
    this.result = null;
  }
  emit(data) {
    this.result = ipcRenderer.sendSync(this.name,data);
    return this.result;
  }
}
