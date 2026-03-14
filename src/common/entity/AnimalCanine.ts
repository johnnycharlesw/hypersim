import { Name } from "../Name.js";
import { LifeForm } from "./LifeForm.js";
export class AnimalCanine extends LifeForm {
    breed: string;
    constructor(name: Name, health: number, attack: number, breed: string) {
        super(name, health, attack);
        this.breed = breed;
        this.isFriendly = true;
    }
    _makeSound(sound: string) {
        console.log(`${this.name} barks: ${sound}.`);
    }
    _isSoundBarkable(sound: string) {
        let barkablePieces = ["ruff", "bark", "woof", "awoo", "howl", "grrr", "yip"];
        let stringPieces = sound.split(" ");
        let isBarkable=false;
        stringPieces.forEach((piece: string) => {
            if (barkablePieces.includes(piece.toLowerCase())) {
                isBarkable=true || isBarkable;
            } else {
                barkablePieces.forEach((barkable: string) => {
                    if (barkable.toLowerCase().includes(piece.toLowerCase())) {
                        isBarkable=true || isBarkable;
                    } else {
                        isBarkable=false;
                    }
                });
            }
        });
        return isBarkable;
    }
    makeSound(sound: string) {
        this._makeSound(sound);
    }
}