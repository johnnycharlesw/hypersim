import { Galaxy } from "./Galaxy.js";
export class GalaxyCluster {
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
