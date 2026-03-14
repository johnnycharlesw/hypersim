import { NPC } from "../character/NPC.js";
import { Name } from "../Name.js";
export class LifeForm extends NPC {
    type: string; // 'animal' or 'canine' or 'wolf' or 'dog' or 'cat' or 'bird' or 'fish'
    isFriendly: boolean = false; // true if the animal is friendly, false otherwise
    constructor(name: Name, health: number, attack: number) {
        super(name, health, attack);
        this.type = 'common-ancestor';
    }
    makeSound(sound: string) {
        console.log(`${this.name} makes a sound: ${sound}.`);
    }
}