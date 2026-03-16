import { Place } from "./Place.js";
import { ObjectPressure } from "../objects/index.js";
import { ObjectMass } from "../objects/index.js";
import { Hitbox } from "../objects/index.js";
export class Country extends Place {
    pressure: ObjectPressure|null;
    mass: ObjectMass|null;
    hitbox: Hitbox;
    countryType: string|null;
    constructor(){
        super();
        this.pressure = null;
        this.mass = null;
        this.hitbox = new Hitbox();
        this.countryType = null;
    }
}