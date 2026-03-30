export {};
import type {ElectronApi} from '../ipcMain/preload.js';
declare global {
    interface Window {
        electronAPI: ElectronApi;
    }
}