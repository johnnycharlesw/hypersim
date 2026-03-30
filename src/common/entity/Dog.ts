import { AnimalCanine } from "./AnimalCanine.js";
import { Name } from "../Name.js";
export class Dog extends AnimalCanine {
    constructor(name: Name, health: number, attack: number, breed: string) {
        super(name, health, attack, breed);
        this.isFriendly=true;
    }

    makeSound(sound: string) {
        if (this._isSoundBarkable(sound)) {
            console.log(`${this.name} barks: ${sound}.`);
        }
    }
}
