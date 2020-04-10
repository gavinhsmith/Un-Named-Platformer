const {ipcRenderer,shell} = require('electron');
const fs = require('fs');
const imgconvert = require('image-data-uri');

function screenshot(filename) {
    var td = imgconvert.decode(c.toDataURL());
    fs.writeFileSync(`C:\\Users\\gavin\\Repositories\\Un-Named-Platformer\\dist\\img\\${filename}.png`,td.dataBuffer);
};
