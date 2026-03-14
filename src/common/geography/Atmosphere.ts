import { ObjectTemperature } from "../objects/index.js";
import { ObjectPressure } from "../objects/index.js";
import { ObjectMass } from "../objects/index.js";
import { Hitbox } from "../objects/index.js";
import { Object_ } from "../objects/index.js";
export class Atmosphere extends Object_ {
    constructor(){
        super();
        this.temperature = new ObjectTemperature();
        this.pressure = new ObjectPressure();
        this.mass = new ObjectMass();
        this.hitbox = new Hitbox();
    }
}