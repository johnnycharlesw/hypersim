import { LifeForm } from "../LifeForm.js";
import { Name } from "../../Name.js";
export class Eukarya extends LifeForm {
    species: string;
    constructor(name: Name, health: number, attack: number, species: string) {
        super(name, health, attack);
        this.species = species;
    }
    _makeSound(sound: string) {
        console.log(`${this.name} makes the sound: ${sound}`);
    }
    makeSound(sound: string) {
        this._makeSound(sound);
    }
}