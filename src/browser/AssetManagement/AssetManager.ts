import AFRAME from 'aframe';
class AssetManager {
    scene: AFRAME.Scene | null;
    aframe_ams: HTMLElement;
    assets: Array<any>;
    constructor() {
        // Initialize asset manager
        this.scene = document.querySelector('a-scene');
        this.aframe_ams = document.createElement('a-assets');
        if (this.scene) {
            this.scene.appendChild(this.aframe_ams);
        }
        this.assets = [];
    }

}