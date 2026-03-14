import { Vector3D } from "../vectors.js";
import { Planet } from "./Planet.js";
import { Border } from "./Border.js";
import { Object_ } from "../objects/index.js";






export class Place {
    id: number|null = null;
    name: string|null = null;
    location: Vector3D;
    planet: Planet|null;
    borders: Border[];
    placesInThisPlace: Place[];
    constructor(){
        this.id = null;
        this.name = null;
        this.location = new Vector3D(0,0,0);
        this.planet = null;
        this.borders = [];
        this.placesInThisPlace = [];
    }
    addPlanet(planet: Planet){
        this.planet = planet;
    }
    getPlanet(){
        return this.planet;
    }


    getBorders(){
        return this.borders;
    }
    addBorder(border: Border){
        this.borders.push(border);
    }

    isHere(object: Object_) {
        return this.borders.some(border => border.isInBorder(object));
    }

    getBorderById(id: number){
        return this.borders.find(border => border.id === id);
    }

    getPlacesInThisPlace(){
        return this.placesInThisPlace;
    }
    addPlaceInThisPlace(place: Place){
        this.placesInThisPlace.push(place);
    }
}