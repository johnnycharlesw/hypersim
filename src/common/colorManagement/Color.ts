import { Vector3D } from "../vectors.js";

export class Color {
    private _rgb: Vector3D;

    constructor(r: number,g: number,b:number) {
        this._rgb=new Vector3D(r,g,b);
    }
    
    // Basic color management
    public get r() : number {
        return this._rgb.x;
    }
    public set r(r: number){
        this._rgb.x=this.srgbCap(r);
    }

    public get g(): number {
        return this._rgb.y;
    }
    public set g(g: number){
        this._rgb.y=this.srgbCap(g);
    }
    
    public get b(): number {
        return this._rgb.z;
    }
    public set b(b: number){
        this._rgb.z=this.srgbCap(b);
    }

    public get rgb(): Array<number> {
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

    // Lightness levels

    public brighten(lightness: number){
        if (this._rgb == new Vector3D(255,255,255)) {
            return; // Cannot lighten white any more.
        }
        this.adjust(lightness,lightness,lightness);
    }

    public darken(darkness: number){
        if (this._rgb == new Vector3D(0,0,0)) {
            return; // Cannot darken black any more.
        }
        this.adjust(-darkness,-darkness,-darkness);
    }

    // Conversion for other processes

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
        // To prevent rendering bugs, check if the color is still sRGB
        if (hexColor>0xFFFFF) {
            return 0x000000; // Will just make the hex color black if the RGB color was non-sRGB
        }
        return hexColor;
    }

    // Color operations
    public static averageColors(colors: Array<Color>){
        let averaged=new Color(0,0,0);
        let averageR=0;
        let averageG=0;
        let averageB=0;
        let amountOfColors = colors.length;
        colors.forEach(color => {
            averageR += color.r;
            averageG += color.g;
            averageB += color.b;
        });
        averageR = averageR/amountOfColors;
        averageG = averageG/amountOfColors;
        averageB = averageB/amountOfColors;
        averaged.r=averageR;
        averaged.g=averageG;
        averaged.b=averageB;
        return averaged;
    }
}