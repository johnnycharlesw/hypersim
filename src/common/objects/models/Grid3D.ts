import { Vector3D } from "../../vectors.js";

export class Grid3D {
    public _grid: Array<Array<Array<any>>>;
    width: number;
    height: number;
    depth: number;
    constructor(width: number, height: number, depth: number){
        this.width=width;
        this.height=height;
        this.depth=depth;
        this._grid=[];
        for (let x = 0; x < width; x++) {
            let xRef;
            if (!this._grid[x]) {
                this._grid.concat([]);
                xRef=this._grid[x];
            } else {
                xRef=this._grid[x];
            }
            for (let y=0; y<height; y++) {
                let yRef;
                if (xRef) {
                    if (!xRef[y]) {
                        xRef[y]=[];

                    }
                    yRef=xRef[y];
                }
                for (let z=0;z<depth;z++) {
                    let zRef;
                    if (yRef) {
                        if (!yRef[z]) {
                            yRef[z]=[];
                        }
                        zRef=yRef[z];

                    }
                }
            }
            
        }
    }

    getItem(position: Vector3D){
        return this._grid[position.x][position.y][position.z];
    }

    setItem(position: Vector3D, item: any){
        this._grid[position.x][position.y][position.z] = item;
    }
}