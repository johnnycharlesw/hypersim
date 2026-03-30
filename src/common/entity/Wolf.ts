import { AnimalCanine } from "./AnimalCanine.js";
import { Name } from "../Name.js";
export class Wolf extends AnimalCanine {
    constructor(name: Name, health: number, attack: number) {
        super(name, health, attack, 'wolf');
        this.isFriendly=false; // what did you expect when thinking it wouldn't be ferocious?
    }
    makeSound(sound: string) {
        if (this._isSoundBarkable(sound)) {
            console.log(`${this.name} barks: ${sound}.`);
        }
    }
}