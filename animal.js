/**
 * Animal module
 * Contains basic animal classes
 */
import {NPC} from './character';
class Animal extends NPC {
    constructor(name, health, attack) {
        super(name, health, attack);
        this.type = 'animal';
    }
    makeSound(sound) {
        console.log(`${this.name} makes a sound: ${sound}.`);
    }
}

class AnimalCanine extends Animal {
    constructor(name, health, attack, breed) {
        super(name, health, attack);
        this.breed = breed;
        this.isFriendly = true;
    }
    _makeSound(sound) {
        console.log(`${this.name} barks: ${sound}.`);
    }
    _isSoundBarkable(sound) {
        let barkablePieces = ["ruff", "bark", "woof", "awoo", "howl", "grrr", "yip"];
        let stringPieces = sound.split(" ");
        let isBarkable = stringPieces.some(piece => barkablePieces.includes(piece.toLowerCase()));
        return isBarkable;
    }
    makeSound(sound) {
        this._makeSound(sound);
    }
}

class Wolf extends AnimalCanine {
    constructor(name, health, attack, breed) {
        super(name, health, attack);
        this.breed = breed;
        this.isFriendly=false; // what did you expect when thinking it wouldn't be ferocious?
    }
    makeSound(sound) {
        if (this._isSoundBarkable(sound)) {
            console.log(`${this.name} barks: ${sound}.`);
        }
    }
}

class Dog extends AnimalCanine {
    constructor(name, health, attack, breed) {
        super(name, health, attack);
        this.breed = breed;
        this.isFriendly=true;
    }

    makeSound(sound) {
        if (this._isSoundBarkable(sound)) {
            console.log(`${this.name} barks: ${sound}.`);
        }
    }
}

class Cat extends Animal {
    constructor(name, health, attack, breed) {
        super(name, health, attack);
        this.breed = breed;
    }

    _isSoundMeowable(sound) {
        let meowablePieces = ["meow", "purr", "whiskers", "purr-purr"];
        let stringPieces = sound.split(" ");
        let isMeowable = stringPieces.some(piece => meowablePieces.includes(piece.toLowerCase()));
        return isMeowable;
    }

    makeSound(sound) {
        if (this._isSoundMeowable(sound)) {
            console.log(`${this.name} meows: ${sound}.`);
        }
    }
}

class Bird extends Animal {
    constructor(name, health, attack, species) {
        super(name, health, attack);
        this.species = species;
    }
    _makeSound(sound) {
        console.log(`${this.name} chirps: ${sound}.`);
    }
    makeSound(sound) {
        this._makeSound(sound);
    }
}

class Fish extends Animal {
    constructor(name, health, attack, species) {
        super(name, health, attack);
        this.species = species;
    }
    _makeSound(sound) {
        console.log(`${this.name} bubbles: ${sound}.`);
    }
    makeSound(sound) {
        this._makeSound(sound);
    }
}