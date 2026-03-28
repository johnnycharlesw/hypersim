// Basic Three.js setup and render loop (bundled to out/browser/mainview.js via webpack)
import { HypersimComponent } from './HypersimComponent.js';
import AFRAME from 'aframe';
window.addEventListener('keypress', (e)=>{
    console.log(e);
});