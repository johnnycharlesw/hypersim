import * as Electron from 'electron';
let mainWindow;
// Data state
let state={};

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
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        mainWindow.loadFile('index.html');
    })
}
main();