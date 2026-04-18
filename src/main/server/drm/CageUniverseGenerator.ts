import { Galaxy } from "../../../common/geography/Galaxy.js";
import { GalaxyCluster } from "../../../common/geography/GalaxyCluster.js";
import { Planet } from "../../../common/geography/Planet.js";
import { Star } from "../../../common/geography/Star.js";
import { Universe } from "../../../common/geography/Universe.js";
import { Server } from "../Server.js";
import { UniverseGenerator } from "../UniverseGenerator.js";

export class CageUniverseGenerator extends UniverseGenerator {
    genUniverse(server: Server): Universe {
        let universe: Universe = server.universe;
        let cageCluster = new GalaxyCluster();
        let cageGalaxy = new Galaxy();
        let starNearCage = new Star();
        let cage = new Planet();
        starNearCage.sendNewPlanetIntoOrbitation(cage);
        cageGalaxy.addStar(starNearCage);
        cageCluster.addGalaxy(cageGalaxy);
        universe.addGalaxyCluster(cageCluster);
        server.universe = universe;
        return universe;
    }         
}