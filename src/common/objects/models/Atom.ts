import { Color } from "../../colorManagement/Color.js";
import { Vector3D } from "../../vectors.js";
import { StatesOfMatter } from "./StatesOfMatter.js";

export class Atom { 
    electrons: number;
    neutrons: number;
    protons: number;
    voxelGridLocation: Vector3D;
    stateOfMatter: StatesOfMatter;
    isTransparent: boolean;
    constructor(electrons: number, neutrons: number, protons: number, voxelGridLocation: Vector3D, stateOfMatter: StatesOfMatter){
        /*
        Actually, maybe this method is a little unrealistic. 
        Matter cannot be created or destroyed. 
        But TypeScript requires it, so here we are.
        Well, actually, based on the content of the method, we could say "it morphed from something else", so there.
        But wait a minute, didn't we basically spawn stuff in the beginning?
        */
        this.electrons=electrons;
        this.neutrons=neutrons;
        this.protons=protons;
        this.voxelGridLocation=voxelGridLocation;
        this.stateOfMatter=stateOfMatter;
        this.isTransparent = false;
    }

    toColor(): Color {
        let colors: Array<Color> = [];
        for (let index = 0; index < this.electrons; index++) {
            colors.concat(new Color(255,255,0));
        }
        for (let index = 0; index < this.neutrons; index++) {
            colors.concat(new Color(0,255,0));
        }
        for (let index=0; index < this.protons; index++) {
            colors.concat(new Color(255,0,0));
        }
        return Color.averageColors(colors);
    }

    
}