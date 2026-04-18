import * as Electron from 'electron';
//import {Marked} from 'marked';
export class ElectronApi {
    //marked: Marked;
    constructor(){
        //this.marked=new Marked();
    }
    getCameraPosition() {
        return Electron.ipcRenderer.invoke('get-camera-position');
    }
    createConfig(config: any){
      return Electron.ipcRenderer.invoke('create-config', config);
    }
    
}
Electron.contextBridge.exposeInMainWorld('electronAPI', new ElectronApi());