import { Vector3D } from "../vectors.js";

export class Color {
    private _rgb: Vector3D;

    
    public get r() : number {
        return this._rgb.x;
    }

    public get g(): number {
        return this._rgb.y;
    }
    
    public get b(): number {
        return this._rgb.z;
    }

    public get rgb(): Array {
        return [this.r, this.g, this.b];
    }

    public srgbCap(channel: number){
        if (channel<0) {
            channel=0;
        }
        if (channel>255) {
            channel=255;
        }
        return channel;
    }

    public adjust(r: number, g: number, b: number){
        this._rgb.move(new Vector3D(r,g,b));
        let adjustedR = this.srgbCap(this._rgb.x);
        let adjustedG = this.srgbCap(this._rgb.y);
        let adjustedB = this.srgbCap(this._rgb.z);
        this._rgb.x=adjustedR;
        this._rgb.y=adjustedG;
        this._rgb.z=adjustedB;
    }

    public toHexColor(){
        let r=this._rgb.x;
        let g=this._rgb.y;
        let b=this._rgb.z;
        let hexColor=0x000000;
        //Red
        let redOnlyHexColor = 0x0F0000 * r;
        //Green
        let greenOnlyHexColor = 0x000F00 * g;
        //Blue
        let blueOnlyHexColor = 0x00000F * b;
        // Final hex color
        hexColor += blueOnlyHexColor;
        hexColor += greenOnlyHexColor;
        hexColor += redOnlyHexColor;
    }
}