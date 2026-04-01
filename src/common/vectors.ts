import * as THREE from 'three';
export class Vector2D {
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

    invertVector(vector: Vector2D = this){
        return new Vector2D(
            -vector.x,
            -vector.y
        );
    }

    backwardsMove(vector: Vector2D){
        this.move(this.invertVector(vector));
    }

    toThreeJsVector2(){
        return new THREE.Vector2(this.x, this.y);
    }
}

export class Vector3D extends Vector2D {
    z: number;
    constructor(x: number, y: number, z: number) {
        super(x, y);
        this.z = z;
    }
    move(vector: Vector3D){
        super.move(vector);
        this.z += vector.z;
    }

    invertVector(vector: Vector3D = this): Vector3D {
        return new Vector3D(
            -vector.x,
            -vector.y,
            -vector.z
        );
    }

    backwardsMove(vector: Vector3D): void {
        this.move(this.invertVector(vector));
    }

    toThreeJsVector3(){
        return new THREE.Vector3(this.x,this.z,this.y);
    }
}

export class Vector4D extends Vector3D {
    w: number;
    constructor(x: number, y: number, z: number, w: number){
        super(x,y,z);
        this.w=w;
    }

    move(vector: Vector4D) {
        super.move(vector);
        this.w+=vector.w;
    }

    invertVector(vector: Vector4D = this): Vector4D {
        return new Vector4D(
            -vector.x,
            -vector.y,
            -vector.z,
            -vector.w
        );
    }

    toThreeJsVector4(){
        return new THREE.Vector4(this.x,this.y,this.z,this.w);
    }
}