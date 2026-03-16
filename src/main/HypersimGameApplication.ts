import * as Electron from 'electron';
export class HypersimGameApplication {
    app: Electron.App;
    constructor() {
        this.app = Electron.app;
    }
}