import { ObjectPressure } from "../objects/index.js";
import { Place } from "./Place.js";
import { ObjectMass } from "../objects/index.js";
import { Hitbox } from "../objects/index.js";
export class Continent extends Place {
    climate: any;
    pressure: ObjectPressure|null;
    mass: ObjectMass|null;
    hitbox: Hitbox;
    continentType: string|null;
    constructor(){
        super();
        this.climate = null;
        this.pressure = null;
        this.mass = null;
        this.hitbox = new Hitbox();
        this.continentType = null;
    }
}