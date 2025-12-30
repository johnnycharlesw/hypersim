/**
 * Geography module
 */

import {Object_, ObjectTemperature, ObjectPressure, ObjectMass, Hitbox} from './objects.js';

class Universe {
    constructor (){
        this.galaxyClusters = [];
    }
    addGalaxyCluster(cluster){
        this.galaxyClusters.push(cluster);
    }
    getGalaxyClusters(){
        return this.galaxyClusters;
    }
    getGalaxyClusterById(id){
        return this.galaxyClusters.find(cluster => cluster.id === id);
    }
}

class GalaxyCluster {
    constructor(){
        this.id = null;
        this.name = null;
        this.galaxies = []
    }
    addGalaxy(galaxy){
        this.galaxies.push(galaxy);
    }
    getGalaxies(){
        return this.galaxies;
    }
    getGalaxyById(id){
        return this.galaxies.find(galaxy => galaxy.id === id);
    }
}

class Galaxy {
    constructor (){
        this.id = null;
        this.name = null;
        this.stars = []
    }
    addStar(star){
        this.stars.push(star);
    }
    getStars(){
        return this.stars;
    }
    getStarById(id){
        return this.stars.find(star => star.id === id);
    }
}

class InterstellarObject extends Object_ {
    constructor (){
        this.id = null;
        this.name = null;
        this.distance = null;
        this.speed = null;
    }
    addDistance(distance){
        this.distance = distance;
    }
    addSpeed(speed){
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
    constructor (){
        super();
        this.temperature = null;
        this.pressure = null;
        this.mass = null;
        this.hitbox = new Hitbox();
        this.planetsOrbiting = [];
    }
    
    sendNewPlanetIntoOrbitation(planet) {
        this.planetsOrbiting.push(planet);
    }
    getPlanetsOrbiting(){
        return this.planetsOrbiting;
    }
    getPlanetById(id){
        return this.planetsOrbiting.find(planet => planet.id === id);
    }
}

class Place {
    constructor(){
        this.id = null;
        this.name = null;
        this.location = null;
        this.planet = null;
        this.borders = [];
        this.placesInThisPlace = [];
    }
    addPlanet(planet){
        this.planet = planet;
    }
    getPlanet(){
        return this.planet;
    }


    getBorders(){
        return this.borders;
    }
    addBorder(border){
        this.borders.push(border);
    }

    isHere(object) {
        return this.borders.some(border => border.isInBorder(object));
    }

    getBorderById(id){
        return this.borders.find(border => border.id === id);
    }

    getPlacesInThisPlace(){
        return this.placesInThisPlace;
    }
    addPlaceInThisPlace(place){
        this.placesInThisPlace.push(place);
    }
}

class Border {
    constructor(){
        this.id=null;
        this.name=null;
        this.location=new Vector3D(0,0,0);
        this.isInBorder = null;
    }
}

class Ocean extends Place {
    constructor(){
        super();
        this.temperature = null;
        this.pressure = null;
        this.mass = null;
        this.hitbox = new Hitbox();
        this.oceanType = null;
    }
}

class Continent extends Place {
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
    constructor(){
        super();
        this.pressure = null;
        this.mass = null;
        this.hitbox = new Hitbox();
        this.countryType = null;
    }
}