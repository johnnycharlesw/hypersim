import { Vector3D } from "../vectors.js";
import { Object_ } from "../objects/index.js";
export class Border {
    id: number|null = null;
    name: string|null = null;
    location: Vector3D;
    private _isInside: boolean;
    constructor(){
        this.id=null;
        this.name=null;
        this.location=new Vector3D(0,0,0);
        this._isInside = false;
    }
    isInBorder(object: Object_): boolean {
        // Placeholder for actual boundary computation using object position/hitbox
        return this._isInside;
    }
}