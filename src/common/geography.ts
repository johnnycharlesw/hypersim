/**
 * Geography module
 */

import {Object_, ObjectTemperature, ObjectPressure, ObjectMass, Hitbox} from './objects.js';
import {Vector3D} from './vectors.js'

class Universe {
    galaxyClusters: GalaxyCluster[];
    constructor (){
        this.galaxyClusters = [];
    }
    addGalaxyCluster(cluster: GalaxyCluster){
        this.galaxyClusters.push(cluster);
    }
    getGalaxyClusters(){
        return this.galaxyClusters;
    }
    getGalaxyClusterById(id: number){
        return this.galaxyClusters.find(cluster => cluster.id === id);
    }
}

class GalaxyCluster {
    id: number|null = null;
    name: string|null = null;
    galaxies: Galaxy[];
    constructor(){
        this.id = null;
        this.name = null;
        this.galaxies = []
    }
    addGalaxy(galaxy: Galaxy){
        this.galaxies.push(galaxy);
    }
    getGalaxies(){
        return this.galaxies;
    }
    getGalaxyById(id: number){
        return this.galaxies.find(galaxy => galaxy.id === id);
    }
}

class Galaxy {
    id: number|null = null;
    name: string|null = null;
    stars: Star[];
    constructor (){
        this.id = null;
        this.name = null;
        this.stars = []
    }
    addStar(star: Star){
        this.stars.push(star);
    }
    getStars(){
        return this.stars;
    }
    getStarById(id: number){
        return this.stars.find(star => star.id === id);
    }
}

class InterstellarObject extends Object_ {
    id: number|null = null;
    name: string|null = null;
    distance: number|null = null;
    speed: number|null = null;
    constructor (){
        super();
        this.id = null;
        this.name = null;
        this.distance = null;
        this.speed = null;
    }
    addDistance(distance: number){
        this.distance = distance;
    }
    addSpeed(speed: number){
        this.speed = speed;
    }
    getDistance(){
        return this.distance;
    }
    getSpeed(){
        return this.speed;
    }
}

class Star extends InterstellarObject {
    planetsOrbiting: Planet[];
    constructor (){
        super();
        this.temperature = new ObjectTemperature();
        this.pressure = new ObjectPressure();
        this.mass = new ObjectMass();
        this.hitbox = new Hitbox();
        this.planetsOrbiting = [];
    }
    
    sendNewPlanetIntoOrbitation(planet: Planet) {
        this.planetsOrbiting.push(planet);
    }
    getPlanetsOrbiting(){
        return this.planetsOrbiting;
    }
    getPlanetById(id: number){
        return this.planetsOrbiting.find(planet => planet.id === id);
    }
}

class Atmosphere extends Object_ {
    constructor(){
        super();
        this.temperature = new ObjectTemperature();
        this.pressure = new ObjectPressure();
        this.mass = new ObjectMass();
        this.hitbox = new Hitbox();
    }
}

class Planet extends InterstellarObject {
    atmosphere: Atmosphere;
    places: Place[];
    constructor (){
        super();
        this.temperature = new ObjectTemperature();
        this.pressure = new ObjectPressure();
        this.mass = new ObjectMass();
        this.hitbox = new Hitbox();
        this.atmosphere = new Atmosphere();
        this.places=[new Place()];
    }
    getAtmosphere(){
        return this.atmosphere;
    }
}

class Place {
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

class Border {
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

class Ocean extends Place {
    temperature: ObjectTemperature;
    pressure: ObjectPressure;
    mass: ObjectMass;
    hitbox: Hitbox;
    oceanType: string;
    constructor(){
        super();
        this.temperature = new ObjectTemperature();
        this.pressure = new ObjectPressure();
        this.mass = new ObjectMass();
        this.hitbox = new Hitbox();
        this.oceanType = 'ocean';
    }
}

class Continent extends Place {
    climate: any;
    pressure: ObjectPressure|null;
    mass: ObjectMass|null;
    hitbox: Hitbox;
    continentType: string|null;
    constructor(){
        super();
        this.climate = null;
        this.pressure = null;
        this.mass = null;
        this.hitbox = new Hitbox();
        this.continentType = null;
    }
}

class Country extends Place {
    pressure: ObjectPressure|null;
    mass: ObjectMass|null;
    hitbox: Hitbox;
    countryType: string|null;
    constructor(){
        super();
        this.pressure = null;
        this.mass = null;
        this.hitbox = new Hitbox();
        this.countryType = null;
    }
}