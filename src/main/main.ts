import * as Electron from 'electron';
import { Vector3D } from '../common/vectors.js';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import {state, isGamePaused, __filename, tick, pauseGame, resumeGame} from './common.js';
import { Server } from './server/Server.js';
let mainWindow;


function main(){
    let args = process.argv.slice(2);
    let headless = args.includes('--headless');
    let server=new Server();
    if (!headless) {
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
        });
        Electron.app.on('window-all-closed', ()=>{
            if (process.platform !== 'darwin') {
                Electron.app.quit();
            }
        });
    }
    
}
main();