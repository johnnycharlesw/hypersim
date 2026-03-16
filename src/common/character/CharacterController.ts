import {Character} from './Character.js';
export class CharacterController {
    character: Character;
    lastAction: any; // Placeholder for the last action taken by the character
    constructor(character: Character) {
        this.character = character;
        this.lastAction = null;
    } 
}