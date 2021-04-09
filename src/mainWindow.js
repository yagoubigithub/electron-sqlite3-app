
const path = require("path");

const { BrowserWindow, app } = require("electron");

let mainWindow = new BrowserWindow({
  show: true,
  // frame : false,
  webPreferences: {
    nodeIntegration: true,
    nativeWindowOpen: true,
    contextIsolation : false,
    enableRemoteModule: true,
  },
 
});
mainWindow.loadURL(`file://${path.join(__dirname, "index.html")}`);




mainWindow.on("close", (e) => {
  app.quit();
});

module.exports = mainWindow;
