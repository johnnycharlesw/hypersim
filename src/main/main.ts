import * as Electron from 'electron';
import { Vector3D } from '../common/vectors.js';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import {state, isGamePaused, __filename, tick, pauseGame, resumeGame} from './common.js';
import { Server } from './server/Server.js';

let mainWindow: Electron.BrowserWindow | null = null;

function main(){
    let args = process.argv.slice(2);
    let headless = args.includes('--headless');
    let server=new Server();
    if (!headless) {
        // Open the Electron.js window
        Electron.app.on('ready', ()=>{
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const preloadPath = path.join(__dirname, '..', 'ipcMain', 'preload.js');
            const indexPath = path.join(__dirname, '..', 'browser', 'index.html');

            mainWindow = new Electron.BrowserWindow({
                width: 800,
                height: 600,
                frame:true,
                autoHideMenuBar: true,
                titleBarOverlay: true,
                webPreferences: {
                    preload: preloadPath,
                    contextIsolation: true,
                    nodeIntegration: false
                }
            });
            mainWindow.loadFile(indexPath);
        });
        Electron.app.on('window-all-closed', ()=>{
            if (process.platform !== 'darwin') {
                Electron.app.quit();
            }
        });
    }
    
}
main();
