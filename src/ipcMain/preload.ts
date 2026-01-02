import * as Electron from 'electron';

class ElectronApi {
    getCameraPosition() {
        return Electron.ipcRenderer.invoke('get-camera-position');
    }
}
Electron.contextBridge.exposeInMainWorld('electronAPI', new ElectronApi)