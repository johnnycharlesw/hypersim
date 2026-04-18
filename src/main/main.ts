import * as Electron from 'electron';
import { Vector3D } from '../common/vectors.js';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import {state, isGamePaused, tick, pauseGame, resumeGame} from './common.js';
import { Server } from './server/Server.js';
import * as fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const preloadPath = path.join(__dirname, '..', 'ipcMain', 'preload.js');
let mainWindow: Electron.BrowserWindow | null = null;
let configCreated=false;
function main(){
    console.log(`Checking for existence of config`);
    let exists = fs.existsSync('game.config.toml');
    if (exists) {
        _main();
    } else {
        showSetupScreen();
    }

    
}

let electronPreferences = {
    width: 800,
    height: 600,
    frame:true,
    autoHideMenuBar: true,
    titleBarOverlay: true,
    webPreferences: {
        preload: preloadPath,
        sandbox: false,
        contextIsolation: true,
        nodeIntegration: false
    }
};

function showSetupScreen(){
  console.log("Showing the setup screen");
    // Open the Electron.js window
    Electron.app.on('ready', ()=>{
        
        const indexPath = path.join(__dirname, '..', 'browser', 'setup.html');

            mainWindow = new Electron.BrowserWindow(electronPreferences);
            mainWindow.loadFile(indexPath);
        });
        // Handle config creation with setup data
        Electron.ipcMain.handle('create-config', async (event, setupData) => {
        return new Promise((resolve, reject) => {
            // 1. Copy the template file
            fs.copyFile(
            path.join(__dirname, '../main/game.config.template.toml'),
            path.join(__dirname, 'game.config.toml'),
            (err) => {
                if (err) {
                reject(`Failed to copy template: ${err.message}`);
                return;
                }

                // 2. Modify the config file with setupData
                // (Example: Replace placeholders in the TOML file)
                const configPath = path.join(__dirname, 'game.config.toml');
                let configContent = require('fs').readFileSync(configPath, 'utf8');

                // Replace placeholders with actual values from setupData
                configContent = configContent
                .replace('{{UNIVERSE_SIZE}}', setupData.universeSize)
                .replace('{{SEED}}', setupData.seed)
                // Add more replacements as needed
                ;

                // 3. Write the modified config back to disk
                fs.writeFile(configPath, configContent, (err) => {
                configCreated=true;
                if (err) reject(`Failed to write config: ${err.message}`);
                else resolve('Config created successfully!');
                });
            }
            );
        });

        
    });
    while (!configCreated) {
        continue;
    }
    mainWindow?.close();
    Electron.app.relaunch();
    Electron.app.exit();
}

function _main(){
    console.log("Starting the game");
    let args = process.argv.slice(2);
    let headless = args.includes('--headless');
    let server=new Server();
    if (!headless) {
        // Open the Electron.js window
        Electron.app.on('ready', ()=>{

            const indexPath = path.join(__dirname, '..', 'browser', 'index.html');

            mainWindow = new Electron.BrowserWindow(electronPreferences);
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
