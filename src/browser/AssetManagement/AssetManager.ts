import AFRAME from 'aframe';
class AssetManager {
    constructor() {
        // Initialize asset manager
        this.scene = document.querySelector('a-scene');
        this.aframe_ams = document.createElement('a-assets');
        this.scene.appendChild(this.aframe_ams);
        this.assets = [];
    }

}