class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    move(vector){
        this.x += vector.x;
        this.y += vector.y;
    }
}

class Vector3D extends Vector2D {
    constructor(x, y, z) {
        super(x, y);
        this.z = z;
    }
    move(vector){
        super.move(vector);
        this.z += vector.z;
    }
}