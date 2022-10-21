import {app, isMac, Menu} from 'electron';
const menuTemplate = [
    // { role: 'appMenu' }
    ...(isMac ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []),
    // { role: 'fileMenu' }
    {
        label: 'File',
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
    },
    // { role: 'editMenu' }
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Undo',
                accelerator: 'CommandOrControl+Z',
                role: 'undo',
            },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            ...(isMac ? [
                { role: 'pasteAndMatchStyle' },
                { role: 'delete' },
                { role: 'selectAll' },
                { type: 'separator' },
                {
                    label: 'Speech',
                    submenu: [
                        { role: 'startSpeaking' },
                        { role: 'stopSpeaking' }
                    ]
                }
            ] : [
                { role: 'delete' },
                { type: 'separator' },
                { role: 'selectAll' }
            ])
        ]
    },
    {
        label: 'Add',
        submenu: [
            {label: 'Shapes',
            submenu: [
                {
                    label: 'Circle',
                    click(item, focusedWindow) {
                        return focusedWindow.webContents.send('addNode','circle');
                    }
                },
                {label: 'Ellipse',
                    click(item, focusedWindow) {
                        return focusedWindow.webContents.send('addNode','ellipse');
                    }
                },
                {label: 'Rectangle',
                    click(item, focusedWindow) {
                        return focusedWindow.webContents.send('addNode','rect');
                    }
                },
                {label: 'Line',
                    click(item, focusedWindow) {
                        return focusedWindow.webContents.send('addNode','line');
                    }
                },
                {label: 'Polygon',
                    click(item, focusedWindow) {
                        return focusedWindow.webContents.send('addNode','polygon');
                    }
                },
            ]
            }
        ]
    },
    // { role: 'viewMenu' }
    {
        label: 'View',
        submenu: [
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    // { role: 'windowMenu' }
    {
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' },
            ...(isMac ? [
                { type: 'separator' },
                { role: 'front' },
                { type: 'separator' },
                { role: 'window' }
            ] : [
                { role: 'close' }
            ])
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'sorry',
                click: async () => {
                    const { shell } = require('electron')
                    await shell.openExternal('https://zombo.com')
                }
            }
        ]
    }
]

export default Menu.buildFromTemplate(menuTemplate);
