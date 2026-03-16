import { InterstellarObject } from "./InterstellarObject.js";
import { Planet } from "./Planet.js";
import { ObjectTemperature } from "../objects/index.js";
import { ObjectPressure } from "../objects/index.js";
import { ObjectMass } from "../objects/index.js";
import { Hitbox } from "../objects/index.js";
export class Star extends InterstellarObject {
    id: number|null = null;
    name: string|null = null;
    planetsOrbiting: Planet[];
    constructor (){
        super();
        this.temperature = new ObjectTemperature();
        this.pressure = new ObjectPressure();
        this.mass = new ObjectMass();
        this.hitbox = new Hitbox();
        this.planetsOrbiting = [];
    }
    
    sendNewPlanetIntoOrbitation(planet: Planet) {
        this.planetsOrbiting.push(planet);
    }
    getPlanetsOrbiting(){
        return this.planetsOrbiting;
    }
    getPlanetById(id: number){
        return this.planetsOrbiting.find(planet => planet.id === id);
    }
}