import {Vector2D, Vector3D} from '../vectors.js';
import { ObjectTemperature } from './ObjectTemperature.js';
import { ObjectPressure } from './ObjectPressure.js';
import { ObjectMass } from './ObjectMass.js';
import { Hitbox } from '../physics/Hitbox.js';
import { AtomicGrid3D } from './models/AtomicGrid3D.js';
import { StatesOfMatter } from './models/StatesOfMatter.js';
export class Object_ { // _ at the end to avoid conflicts with built-in JavaScript objects
    temperature: ObjectTemperature;
    pressure: ObjectPressure;
    mass: ObjectMass;
    hitbox: Hitbox;
    size: Vector3D; // Assuming the object is a cube for simplicity (actually, it kind of always is)
    position: Vector3D;
    model: AtomicGrid3D;
    constructor () {
        this.temperature = new ObjectTemperature();
        this.pressure = new ObjectPressure();
        this.mass = new ObjectMass();
        this.hitbox = new Hitbox();
        this.size = new Vector3D(0, 0, 0); // Assuming the object is a cube for simplicity
        this.position = new Vector3D(0, 0, 0);
        this.model=new AtomicGrid3D(1,1,1,StatesOfMatter.Solid);
    }

    pushAround(position: Vector3D) {
        this.position.move(position);
    }

    heatUp(amount: number) {
        this.temperature.raiseTemperature(amount);
    }

    coolDown(amount: number) {
        this.temperature.lowerTemperature(amount);
    }

    _increasePressure(amount: number) {
        this.pressure.raisePressure(amount);
    }

    _decreasePressure(amount: number) {
        this.pressure.lowerPressure(amount);
    }

    _increaseMass(amount: number) {
        this.mass.raiseMass(amount);
    }

    _decreaseMass(amount: number) {
        this.mass.lowerMass(amount);
    }

    _calculateMass(){
        // Predict the mass from the 3D model shape and size
        let volume = this._calculateVolume();
        let mass = volume * 1000; // Assuming 1 cubic meter of the model weighs 1000 kilograms
    }

    _calculateVolume(){
        // Calculate the volume of the 3D model shape
        if (!this.size.x || !this.size.y || !this.size.z) return 0;
        if (!this.hitbox.width || !this.hitbox.height || !this.hitbox.depth) return 0;
        let volume = this.hitbox.width * this.hitbox.height * this.hitbox.depth;
        return volume;
    }

    _updateHitbox() {
        // Update the hitbox based on the object's current position and size
        this.hitbox.width = this.size.x;
        this.hitbox.height = this.size.y;
        this.hitbox.depth = this.size.z;
        this.hitbox.position = this.position;
    }

    tick() {
        // Placeholder: print "Object is moving"
        console.log("Object is moving");
    }
}