import {Object_} from '../objects/index.js';
import {Name} from '../Name.js';
import {Vector3D} from '../vectors.js';
import { CharacterController } from './CharacterController.js';
export class Character extends Object_ {
    name: Name;
    health: number;
    attack: number;
    controller: CharacterController|null;
    constructor(name: Name, health: number, attack: number, controller: CharacterController|null) {
        super();
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.controller = controller;
    }
    attackEnemy(enemy: Character) {
        enemy.health -= this.attack;
        console.log(`${this.name} attacks ${enemy.name} for ${this.attack} damage.`);
    }
    moveAround(position: Vector3D) {
        super.pushAround(position);
    }

    getHealth() {
        return this.health;
    }
}