const {ipcRenderer,shell} = require('electron');
const fs = require('fs');
const imgconvert = require('image-data-uri');

function screenshot(filepath) {
    var td = imgconvert.decode(c.toDataURL());
    fs.writeFileSync(filepath,td.dataBuffer);
};
