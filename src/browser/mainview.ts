// Basic Three.js setup and render loop (bundled to out/browser/mainview.js via webpack)
import { HypersimComponent } from './HypersimComponent.js';
import AFRAME from 'aframe';
AFRAME.registerComponent('hypersim', new HypersimComponent());
