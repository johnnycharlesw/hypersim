import { InterstellarObject } from "./InterstellarObject.js";
import { Atmosphere } from "./Atmosphere.js";
import { Place } from "./Place.js";
import { ObjectTemperature } from "../objects/index.js";
import { ObjectPressure } from "../objects/index.js";
import { ObjectMass } from "../objects/index.js";
import { Hitbox } from "../objects/index.js";

export class Planet extends InterstellarObject {
    id: number|null = null;
    name: string|null = null;
    atmosphere: Atmosphere;
    places: Place[];
    constructor (){
        super();
        this.temperature = new ObjectTemperature();
        this.pressure = new ObjectPressure();
        this.mass = new ObjectMass();
        this.hitbox = new Hitbox();
        this.atmosphere = new Atmosphere();
        this.places=[new Place()];
    }
    getAtmosphere(){
        return this.atmosphere;
    }
}