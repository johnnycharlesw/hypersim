import * as Electron from 'electron';
import {Marked} from 'marked';
export class ElectronApi {
    marked: Marked;
    constructor(){
        this.marked=new Marked();
    }
    getCameraPosition() {
        return Electron.ipcRenderer.invoke('get-camera-position');
    }
    pauseGame() {
        
        this.pauseGame();
        
    }

    resumeGame(){
        this.resumeGame();
    }
    
}
Electron.contextBridge.exposeInMainWorld('electronAPI', new ElectronApi());