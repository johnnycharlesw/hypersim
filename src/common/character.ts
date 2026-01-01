import {Object_} from './objects.js';
import {Name} from './name.js';
import {Vector3D} from './vectors.js';
import {Ollama} from 'ollama';
class Character extends Object_ {
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

class CharacterController {
    character: Character;
    lastAction: any; // Placeholder for the last action taken by the character
    constructor(character: Character) {
        this.character = character;
        this.lastAction = null;
    } 
}

class NPC_AI extends CharacterController {
    ollamaConnection: Ollama;
    constructor(character: Character){
        super(character);
        this.ollamaConnection = new Ollama();
        // Note: Ollama client does not expose an 'on' event API in this version; replace with actual request/response calls when integrating.
    }
    haveCharacterAct(response: any) {
        if (response.status === 'success') {
            console.log('Character has acted!');
            this.lastAction = JSON.parse(response.data);
            this.lastAction.timestamp = new Date();
        } else {
            console.error('Error from Ollama:', response.error);
        }
    }
}

class NPC extends Character {
    isFriendly: boolean = true;
    constructor(name: Name, health: number, attack: number) {
        super(name, health, attack, null);
        this.isFriendly=true;
        this.controller = new NPC_AI(this);
    }

}

export {NPC, Character, NPC_AI, CharacterController};