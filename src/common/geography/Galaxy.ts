import { Star } from "./Star.js";
export class Galaxy {
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