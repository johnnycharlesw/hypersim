import { Color } from "../../colorManagement/Color.js";
import type { Atom } from "./Atom.js";
import { Grid3D } from "./Grid3D.js";
import type { StatesOfMatter } from "./StatesOfMatter.js";

export class AtomicGrid3D extends Grid3D {
    stateOfMatter: StatesOfMatter;
    constructor(width: number, height: number, depth: number, stateOfMatter: StatesOfMatter){
        super(width,height,depth);
        this.stateOfMatter=stateOfMatter;

    }
    public _calculateMass(): number {
        let voxelCount = 0;
        this._grid.forEach(xRef=> {
            xRef.forEach((yRef)=>{
                yRef.forEach((zRef)=>{
                    zRef.forEach((atomRef: Atom) => {
                        if (!atomRef.isTransparent) { // Non-transparent
                            voxelCount++;
                        }
                    });
                });
            });
        });

        // return voxelCount * server.voxelDensity;
        return voxelCount * 0.000000001;
    }
}