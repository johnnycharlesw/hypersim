import { Vector3D } from "../../vectors.js";

export class Grid3D {
    public _grid: any[][][];
    width: number;
    height: number;
    depth: number;

    constructor(width: number, height: number, depth: number){
        this.width = width;
        this.height = height;
        this.depth = depth;

        // initialize a 3D array [width][height][depth] with defined inner arrays
        this._grid = Array.from({ length: width }, () =>
            Array.from({ length: height }, () => new Array(depth).fill(undefined))
        );
    }

    getItem(position: Vector3D): any | undefined {
        if (!position || position.x == null || position.y == null || position.z == null) {
            return undefined;
        }
        const x = position.x;
        const y = position.y;
        const z = position.z;
        if (x < 0 || x >= this.width || y < 0 || y >= this.height || z < 0 || z >= this.depth) {
            return undefined;
        }
        return this._grid[x]![y]![z];
    }

    setItem(position: Vector3D, item: any): void {
        if (!position || position.x == null || position.y == null || position.z == null) {
            return;
        }
        const x = position.x;
        const y = position.y;
        const z = position.z;
        if (x < 0 || x >= this.width || y < 0 || y >= this.height || z < 0 || z >= this.depth) {
            return;
        }
        this._grid[x]![y]![z] = item;
    }
}
