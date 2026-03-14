import { Object_ } from "../objects/index.js";
export class InterstellarObject extends Object_ {
    id: number|null = null;
    name: string|null = null;
    distance: number|null = null;
    speed: number|null = null;
    constructor (){
        super();
        this.id = null;
        this.name = null;
        this.distance = null;
        this.speed = null;
    }
    addDistance(distance: number){
        this.distance = distance;
    }
    addSpeed(speed: number){
        this.speed = speed;
    }
    getDistance(){
        return this.distance;
    }
    getSpeed(){
        return this.speed;
    }
}