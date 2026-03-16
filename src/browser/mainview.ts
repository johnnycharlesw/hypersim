// Basic Three.js setup and render loop
// This file is compiled to out/browser/mainview.js by tsc

import AFRAME from 'aframe';
AFRAME.registerComponent('hypersim', ()=>{
    
});
import {Animal, Wolf, Dog, Bird, Fish} from '../common/animal/index.js';
import {Character, CharacterController, NPC_AI, NPC} from '../common/character.js';
import { Name } from '../common/Name.js';
import { Vector2D, Vector3D } from '../common/vectors.js';