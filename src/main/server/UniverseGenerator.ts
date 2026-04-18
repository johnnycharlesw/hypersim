import { Galaxy } from "../../common/geography/Galaxy.js";
import { GalaxyCluster } from "../../common/geography/GalaxyCluster.js";
import { Planet } from "../../common/geography/Planet.js";
import { Star } from "../../common/geography/Star.js";
import { Universe } from "../../common/geography/Universe.js";
import { Dice } from "../../common/randomness/Dice.js";
import { Server } from "./Server.js";
import path from "path";
import { fileURLToPath } from 'node:url';
import * as Electron from 'electron';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const preloadPath = path.join(__dirname, '..', 'ipcMain', 'preload.js');
let mainWindow: Electron.BrowserWindow | null = null;
export class UniverseGenerator {
  dice: Dice;
  constructor(){
    this.dice=new Dice(null);
  }
  genUniverse(server: Server): Universe {
    console.log("Generating universe");
    let galaxyClusterCount = this.dice.randomIntBetween(5,15);
    for (let galaxyClusterId = 0; galaxyClusterId < galaxyClusterCount; galaxyClusterId++) {
        console.log(`Generating galaxy cluster ${galaxyClusterId}`);
        let galaxyCluster = new GalaxyCluster();
        galaxyCluster.id=galaxyClusterId;
        let galaxyCount = this.dice.randomIntBetween(10,20);
        for (let galaxyId = 0; galaxyId < galaxyCount; galaxyId++) {
            console.log(`Generating galaxy ${galaxyId} in galaxy cluster ${galaxyClusterId}`);
            let galaxy = new Galaxy();
            galaxy.id=galaxyId;
            console.log(`Generating stars for galaxy ${galaxyId} in galaxy cluster ${galaxyClusterId}`);
            let starCount = this.dice.randomIntBetween(1000,5000);
            for (let starId=0; starId<starCount; starId++) {
              console.log(`Generating star ${starId} in galaxy ${galaxyId}`);
              let star = new Star();
              star.id=starId;
              console.log(`Generating planets for star ${starId} in galaxy ${galaxyId}`);
              let planetCount = this.dice.randomIntBetween(0,8);
              for (let planetId = 0; planetId < planetCount; planetId++) {
                console.log(`Generating planet ${planetId} orbiting star ${starId}`);
                let planet = new Planet();
                planet.id=planetId;
                console.log(`Sending planet ${planetId} into orbitation of star ${starId}`);
                star.sendNewPlanetIntoOrbitation(planet);
                console.log(`Generated planet ${planetId} orbiting star ${starId}`)
              }
              galaxy.addStar(star);
              console.log(`Generated star ${starId} in galaxy ${galaxyId}`);
            }
            galaxyCluster.addGalaxy(galaxy);
            console.log(`Generated galaxy ${galaxyId} in galaxy cluster ${galaxyClusterId}`);
        }
        console.log(`Generated galaxy cluster ${galaxyClusterId}`);
        server.universe.addGalaxyCluster(galaxyCluster);
    }
    console.log('Generated universe');
    return server.universe;
  }
}