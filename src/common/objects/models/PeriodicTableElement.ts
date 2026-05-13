import { Name } from "../../Name.js";
import { Vector3D } from "../index.js";

export class PeriodicTableElement {
    _enp: Vector3D;
    name: Name;
    constructor(electrons: number, neutrons: number, protons: number) {
      this._enp=new Vector3D(electrons,neutrons,protons);
      this.name=new Name([],"","","",[]);
    }


    public get enp() : Vector3D {
      return this._enp;
    }

    public get electrons(): number {
      return this.enp.x;
    }

    public get neutrons(): number {
      return this.enp.y;
    }

    public get protons(): number {
      return this.enp.z;
    }

    public set electrons(electrons: number) {
      this._enp.x=electrons;
    }
    
    public set neutrons (neutrons: number) {
      this._enp.y=neutrons;
    }

    public set protons (protons: number) {
      this._enp.z=protons;
    }

    public set enp (enp: Vector3D) {
      this._enp = enp;
    }
    
}