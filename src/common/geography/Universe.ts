import { GalaxyCluster } from "./GalaxyCluster.js";
export class Universe {
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
