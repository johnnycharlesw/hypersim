/**
 * Animal module
 * Contains basic animal classes
 */
import {NPC} from './character.js';
import {Name} from './name.js';
class Animal extends NPC {
    type: string; // 'animal' or 'canine' or 'wolf' or 'dog' or 'cat' or 'bird' or 'fish'
    isFriendly: boolean = false; // true if the animal is friendly, false otherwise
    constructor(name: Name, health: number, attack: number) {
        super(name, health, attack);
        this.type = 'animal';
    }
    makeSound(sound: string) {
        console.log(`${this.name} makes a sound: ${sound}.`);
    }
}

class AnimalCanine extends Animal {
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

class Wolf extends AnimalCanine {
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

class Dog extends AnimalCanine {
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

class Cat extends Animal {
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

class Bird extends Animal {
    species: string;
    constructor(name: Name, health: number, attack: number, species: string) {
        super(name, health, attack);
        this.species = species;
    }
    _makeSound(sound: string) {
        console.log(`${this.name} chirps: ${sound}.`);
    }
    makeSound(sound: string) {
        this._makeSound(sound);
    }
}

class Fish extends Animal {
    species: string;
    constructor(name: Name, health: number, attack: number, species: string) {
        super(name, health, attack);
        this.species = species;
    }
    _makeSound(sound: string) {
        console.log(`${this.name} bubbles: ${sound}.`);
    }
    makeSound(sound: string) {
        this._makeSound(sound);
    }
}