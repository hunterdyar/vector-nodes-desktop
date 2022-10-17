import {app, BrowserWindow, ipcMain, session, Menu} from 'electron';
import {join} from 'path';
import menuTemplate from "./menuTemplate";

var canvasContext;

function createWindow () {

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });
  const canvasWindow = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  //close canvas window when main window closes. if we close the canvas window, no good. so need a way to re-open that from them menu.
  mainWindow.on('close',()=>{
      canvasWindow.close();
  });

  //i think we should be able to close and re-open canvas, but destroyed object bugs
  canvasWindow.on('close',()=>{
    mainWindow.close();
  });

  canvasContext = canvasWindow.webContents;

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}/index.html`);
    canvasWindow.loadURL(`http://localhost:${rendererPort}/canvas.html`);
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'Vector Nodes', 'index.html'));
    canvasWindow.loadFile(join(app.getAppPath(), 'Vector Nodes', 'canvas.html'));
  }
}

function draw(event,shape)
{
  canvasContext.send('onDraw', shape);
}
function clear(event,force)
{
  canvasContext.send('onClear',force);
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(menuTemplate);
  //
  ipcMain.on('draw',draw);
  ipcMain.on('clear',clear);
  createWindow();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['script-src \'self\'']
      }
    })
  });

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });


});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.on('message', (event, message) => {
  console.log(message);
})
