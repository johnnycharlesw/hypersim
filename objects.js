import {Vector2D, Vector3D} from './vectors.js';

class ObjectTemperature {
    constructor () {
        this.fahrenheit = null;
    }

    raiseTemperature(amount) {
        this.fahrenheit += amount;
    }

    lowerTemperature(amount) {
        this.fahrenheit -= amount;
    }
}

class ObjectPressure {
    constructor () {
        this.pascal = null;
    }
    raisePressure(amount) {
        this.pascal += amount;
    }
    lowerPressure(amount) {
        this.pascal -= amount;
    }
}

class ObjectMass {
    constructor () {
        this.kilograms = null;
    }
    raiseMass(amount) {
        this.kilograms += amount;
    }
    lowerMass(amount) {
        this.kilograms -= amount;
    }
}

class Hitbox {
    constructor () {
        this.width = null;
        this.height = null;
        this.depth = null;
        this.position = new Vector3D(0, 0, 0);
    }

    isColliding(otherHitbox) {
        // Calculate the bounding box of the hitbox
        this._calculateBoundingBox();

        // Calculate the bounding box of the other hitbox
        otherHitbox._calculateBoundingBox();
        // Check if the bounding boxes intersect
        return this._isBoundingBoxIntersecting(otherHitbox);
    }

    _calculateBoundingBox() {
        this.boundingBox = {};
        this.boundingBox.point1 = this.position;
        this.boundingBox.point2 = new Vector3D(this.position.x + this.width, this.position.y + this.height, this.position.z + this.depth);
        this.boundingBox.point3 = new Vector3D(this.position.x, this.position.y+this.height, this.position.z);
        this.boundingBox.point4 = new Vector3D(this.position.x + this.width, this.position.y, this.position.z);
    }

    _isBoundingBoxIntersecting(otherHitbox) {
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
    constructor () {
        this.temperature = new ObjectTemperature();
        this.pressure = new ObjectPressure();
        this.mass = new ObjectMass();
        this.hitbox = new Hitbox();
        this.size = new Vector3D(0, 0, 0); // Assuming the object is a cube for simplicity
        this.position = new Vector3D(0, 0, 0);
    }

    pushAround(position) {
        this.position.move(position);
    }

    heatUp(amount) {
        this.temperature.raiseTemperature(amount);
    }

    coolDown(amount) {
        this.temperature.lowerTemperature(amount);
    }

    _increasePressure(amount) {
        this.pressure.raisePressure(amount);
    }

    _decreasePressure(amount) {
        this.pressure.lowerPressure(amount);
    }

    _increaseMass(amount) {
        this.mass.raiseMass(amount);
    }

    _decreaseMass(amount) {
        this.mass.lowerMass(amount);
    }

    _calculateMass(){
        // Predict the mass from the 3D model shape and size
        let mass = this._calculateVolume() * 1000; // Assuming 1 cubic meter of the model weighs 1000 kilograms
    }

    _calculateVolume(){
        // Calculate the volume of the 3D model shape
        let volume = this.hitbox.width * this.hitbox.height * this.hitbox.depth;
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