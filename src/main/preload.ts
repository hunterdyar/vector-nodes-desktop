import {contextBridge, ipcRenderer} from 'electron';
// import WindowManager from 'electron-window-manager';

console.log("preload.ts");

contextBridge.exposeInMainWorld('api', {
  ipcRenderer: ipcRenderer,
  draw: (shape) => ipcRenderer.send('draw', shape),
  clear: (force) => ipcRenderer.send('clear', force),
  onDraw: (callback) => ipcRenderer.on('onDraw', callback),
  onClear: (callback) => ipcRenderer.on('onClear', callback),
});

