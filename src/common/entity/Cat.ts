import { LifeForm } from "./LifeForm.js";
import { Name } from "../Name.js";
export class Cat extends LifeForm {
    breed: string;
    constructor(name: Name, health: number, attack: number, breed: string) {
        super(name, health, attack);
        this.breed = breed;
    }

    _isSoundMeowable(sound: string) {
        let meowablePieces = ["meow", "purr", "whiskers", "purr-purr"];
        let stringPieces = sound.split(" ");
        let isMeowable = stringPieces.some((piece: string) => meowablePieces.includes(piece.toLowerCase()));
        return isMeowable;
    }

    makeSound(sound: string) {
        if (this._isSoundMeowable(sound)) {
            console.log(`${this.name} meows: ${sound}.`);
        }
    }
}