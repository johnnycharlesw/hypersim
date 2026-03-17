// Basic Three.js setup and render loop
// This file is compiled to out/browser/mainview.js by tsc

import AFRAME from 'aframe';
AFRAME.registerComponent('hypersim', ()=>{
    
});
import { LifeForm } from '../common/entity/LifeForm.js';
import { Wolf } from '../common/entity/Wolf.js';
import { Dog } from '../common/entity/Dog.js';
import { Bird } from '../common/entity/Bird.js';
import { Fish } from '../common/entity/Fish.js';
import { Character } from '../common/character/Character.js';
import { CharacterController } from '../common/character/CharacterController.js';
import { NPC_AI } from '../common/character/NPC_AI.js';
import { NPC } from '../common/character/NPC.js';
import { Name } from '../common/Name.js';
import { Vector2D, Vector3D } from '../common/vectors.js';