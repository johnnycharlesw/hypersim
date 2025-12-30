import {Object_} from './objects.js';
import {Name} from './name.js';
const {Ollama}=require('ollama');

class Character extends Object_ {
    constructor(name, health, attack) {
        super();
        this.name = name;
        this.health = health;
        this.attack = attack;
    }
    attackEnemy(enemy) {
        enemy.health -= this.attack;
        console.log(`${this.name} attacks ${enemy.name} for ${this.attack} damage.`);
    }
    moveAround(position) {
        super.pushAround(position);
    }

    getHealth() {
        return this.health;
    }
}

class CharacterController {
    constructor(character) {
        this.character = character;
    } 
}

class NPC_AI extends CharacterController {
    constructor(){
        this.ollamaConnection = new Ollama();
        this.ollamaConnection.on('response', this.haveCharacterAct);
    }
    haveCharacterAct(response) {
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
    constructor(name, health, attack) {
        super(name, health, attack);
        this.controller = new NPC_AI();
    }

}