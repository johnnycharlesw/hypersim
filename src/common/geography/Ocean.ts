import { ObjectTemperature } from "../objects/index.js";
import { ObjectPressure } from "../objects/index.js";
import { ObjectMass } from "../objects/index.js";
import { Hitbox } from "../objects/index.js";
import { Place } from "./Place.js";
export class Ocean extends Place {
    temperature: ObjectTemperature;
    pressure: ObjectPressure;
    mass: ObjectMass;
    hitbox: Hitbox;
    oceanType: string;
    constructor(){
        super();
        this.temperature = new ObjectTemperature();
        this.pressure = new ObjectPressure();
        this.mass = new ObjectMass();
        this.hitbox = new Hitbox();
        this.oceanType = 'ocean';
    }
}