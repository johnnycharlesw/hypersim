import * as Electron from 'electron';

class ElectronApi {
    getCameraPosition() {
        return Electron.ipcRenderer.invoke('get-camera-position');
    }
    pauseGame() {
        
        pauseGame();
        
    }

    resumeGame(){
        resumeGame();
    }
    
}
Electron.contextBridge.exposeInMainWorld('electronAPI', new ElectronApi());