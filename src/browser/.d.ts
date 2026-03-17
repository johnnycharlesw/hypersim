export {};
import {ElectronApi} from '../ipcMain/preload.js';
declare global {
    interface Window {
        electronAPI: ElectronApi;
    }
}