import {Vector2D, Vector3D} from './vectors.js';

class ObjectTemperature {
    fahrenheit: number|null = null;
    constructor () {
        this.fahrenheit = null;
    }

    raiseTemperature(amount: number) {
        if (this.fahrenheit) this.fahrenheit += amount;
    }

    lowerTemperature(amount: number) {
        if (this.fahrenheit) this.fahrenheit -= amount;
    }
}

class ObjectPressure {
    pascal: number|null=null;
    constructor () {
        this.pascal = null;
    }
    raisePressure(amount: number) {
        if (this.pascal) this.pascal += amount;
    }
    lowerPressure(amount: number) {
        if (this.pascal) this.pascal -= amount;
    }
}

class ObjectMass {
    kilograms: number|null = null;
    constructor () {
        this.kilograms = null;
    }
    raiseMass(amount: number) {
        if (this.kilograms) this.kilograms += amount;
    }
    lowerMass(amount: number) {
        if (this.kilograms) this.kilograms -= amount;
    }
}

class Hitbox {
    width: number|null = null;
    height: number|null = null;
    depth: number|null = null;
    position: Vector3D;
    boundingBox: any; // Placeholder for the bounding box calculation
    constructor () {
        this.width = 0;
        this.height = 0;
        this.depth = 0;
        this.position = new Vector3D(0, 0, 0);
    }

    isColliding(otherHitbox: Hitbox) {
        // Calculate the bounding box of the hitbox
        this._calculateBoundingBox();

        // Calculate the bounding box of the other hitbox
        otherHitbox._calculateBoundingBox();
        // Check if the bounding boxes intersect
        return this._isBoundingBoxIntersecting(otherHitbox);
    }

    _calculateBoundingBox() {
        if (!this.width || !this.height || !this.depth) return;
        this.boundingBox = {};
        this.boundingBox.point1 = this.position;
        this.boundingBox.point2 = new Vector3D(this.position.x + this.width, this.position.y + this.height, this.position.z + this.depth);
        this.boundingBox.point3 = new Vector3D(this.position.x, this.position.y+this.height, this.position.z);
        this.boundingBox.point4 = new Vector3D(this.position.x + this.width, this.position.y, this.position.z);
    }

    _isBoundingBoxIntersecting(otherHitbox: Hitbox) {
        // Check if the bounding boxes intersect
        return this.boundingBox.point1.x < otherHitbox.boundingBox.point2.x &&
               this.boundingBox.point2.x > otherHitbox.boundingBox.point1.x &&
               this.boundingBox.point1.y < otherHitbox.boundingBox.point2.y &&
               this.boundingBox.point2.y > otherHitbox.boundingBox.point1.y &&
               this.boundingBox.point1.z < otherHitbox.boundingBox.point2.z &&
               this.boundingBox.point2.z > otherHitbox.boundingBox.point1.z;
    }
}

class Object_ { // _ at the end to avoid conflicts with built-in JavaScript objects
    temperature: ObjectTemperature;
    pressure: ObjectPressure;
    mass: ObjectMass;
    hitbox: Hitbox;
    size: Vector3D; // Assuming the object is a cube for simplicity
    position: Vector3D;
    constructor () {
        this.temperature = new ObjectTemperature();
        this.pressure = new ObjectPressure();
        this.mass = new ObjectMass();
        this.hitbox = new Hitbox();
        this.size = new Vector3D(0, 0, 0); // Assuming the object is a cube for simplicity
        this.position = new Vector3D(0, 0, 0);
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

export {Object_, ObjectTemperature, ObjectPressure, ObjectMass, Hitbox};