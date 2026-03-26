import { Vector3D } from "../vectors.js";
export class Hitbox {
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