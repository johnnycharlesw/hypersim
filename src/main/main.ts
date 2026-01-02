import * as Electron from 'electron';
import { Vector3D } from '../common/vectors.js';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
let mainWindow;
// Data state
let state={};
let camera_position = new Vector3D(0,0,0);
const __filename =  fileURLToPath(import.meta.url);
// Main loop
function tick(){
    // Placeholder: print "Hello World!"
    console.log("Hello World!");
}

function main(){
    // Open the Electron.js window
    Electron.app.on('ready', ()=>{
        mainWindow = new Electron.BrowserWindow({
            width: 800,
            height: 600,
            frame:true,
            autoHideMenuBar: true,
            titleBarOverlay: true,
            webPreferences: {
                preload: path.join(path.dirname(__filename), 'out', 'ipcMain', 'preload.js')
            }
        });
        mainWindow.loadFile('out/browser/index.html');
        Electron.ipcMain.on('get-camera-position', (event, arg) => {
            event.returnValue = camera_position;
        });
    });
    Electron.app.on('window-all-closed', ()=>{
        if (process.platform !== 'darwin') {
            Electron.app.quit();
        }
    });
}
main();