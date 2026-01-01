class Vector2D {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    move(vector: Vector2D){
        this.x += vector.x;
        this.y += vector.y;
    }
}

class Vector3D extends Vector2D {
    z: number;
    constructor(x: number, y: number, z: number) {
        super(x, y);
        this.z = z;
    }
    move(vector: Vector3D){
        super.move(vector);
        this.z += vector.z;
    }
}

export {Vector2D, Vector3D};