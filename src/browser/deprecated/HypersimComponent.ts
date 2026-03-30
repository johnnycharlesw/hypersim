import { AEntity, Entity, ObjectMap, Scene, Schema, components } from "aframe";
import { Component } from "aframe";
import { System } from "aframe";
export class HypersimComponent implements Component<any, System<any>>{
    schema: object;
    data: object;
    el: Entity<ObjectMap<any>>;
    id: string;
    initialized: boolean;
    name: string;
    system: System<any> | undefined;
    scene: Scene;
    extendSchema(update: Schema<object>): void {
        this.schema = {...this.schema, ...update};
        this.name="Hypersim";
    }
    constructor(){
        this.schema={
            "server": {
                "default": "127.0.0.1:37008"
            }
        };
        this.data={
            "server": "127.0.0.1:37008"
        };
        this.id = "hypersim";
        this.initialized=false;
        this.name="hypersim";
        this.el=new Entity();
        this.scene = document.querySelector('a-scene')!;
    }

    init(): void{
        let skyDefaultColorElement=document.createElement('a-sky');
        skyDefaultColorElement.setAttribute('color', '#000000');
        this.scene.appendChild(skyDefaultColorElement);
    }

    update(): void {
        
    }
    tick(): void {
        
    }
    pause(): void {
        
    }

    play(): void {
        
    }

    remove(): void {
        
    }

    flushToDOM(): void {
        
    }
}

AFRAME.registerComponent('hypersim', new HypersimComponent());