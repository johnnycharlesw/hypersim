import {Character} from './Character.js';
import { NPC_AI } from './NPC_AI.js';
import { Name } from '../Name.js';
export class NPC extends Character {
    isFriendly: boolean = true;
    constructor(name: Name, health: number, attack: number) {
        super(name, health, attack, null);
        this.isFriendly=true;
        this.controller = new NPC_AI(this);
    }

}