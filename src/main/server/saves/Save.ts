import { Server } from "../Server.js";
import * as nbt from 'prismarine-nbt';
import path from "path";
import * as msgpack from '@msgpack/msgpack';
import * as fs from "fs";
import { Universe } from "../../../common/geography/Universe.js";
import { Object_ } from "../../../common/objects/Object_.js";
import { GalaxyCluster } from "../../../common/geography/GalaxyCluster.js";
import { Galaxy } from "../../../common/geography/Galaxy.js";
import { Star } from "../../../common/geography/Star.js";
import { Planet } from "../../../common/geography/Planet.js";
import { AtomicGrid3D } from "../../../common/objects/models/AtomicGrid3D.js";
import { Vector3D } from "../../../common/vectors.js";
import { StatesOfMatter } from "../../../common/objects/models/StatesOfMatter.js";
import isNumber from 'is-number';
import { Atom } from "../../../common/objects/models/Atom.js";
export class Save {
    path: string;
    server: Server;
    constructor(path:string, server: Server) {
      this.path=path;
      this.server=server;
    }
    save(){
      console.log('Making save directory');
      fs.mkdirSync(this.path);
      console.log('Saving main data files');
      this.saveUniverse(this.server.universe);
      console.log('Saving objects');
      let objectsFile = path.join(this.path, 'objects.dat');
      fs.writeFileSync(objectsFile, msgpack.encode(this.server.objects));
    }

    writeFile(path_: string, data: any) {
      fs.writeFileSync(path_, msgpack.encode(data));
    }

    writeMetaFile(path_: string, data: any) {
      this.writeFile(path.join(path_, 'meta.dat'), data);
    }

    readFile(path_: string){
      return msgpack.decode(fs.readFileSync(path_));
    }

    readMetaFile(path_: string) {
      return this.readFile(path.join(path_, 'meta.dat'));
    }

    saveUniverse(universe: Universe){
      let save=this;
      universe.galaxyClusters.forEach(function (galaxyCluster: GalaxyCluster){
        save.saveGalaxyCluster(galaxyCluster, path.join(save.path, galaxyCluster.id!.toString()));
      });
    }

    saveGalaxyCluster(galaxyCluster: GalaxyCluster, path_: string) {
      fs.mkdirSync(path_);
      this.writeMetaFile(path_, {
        "name":galaxyCluster.name
      });
      let save=this;
      galaxyCluster.galaxies.forEach(function (galaxy: Galaxy) {
        save.saveGalaxy(galaxy, path.join(path_, galaxy.id!.toString()));
      });
    }

    saveGalaxy(galaxy: Galaxy, path_: string) {
      fs.mkdirSync(path_);
      this.writeMetaFile(path_, {
        "name": galaxy.name
      });
      let save=this;
      galaxy.stars.forEach(function (star: Star) {
        save.saveStar(star, path.join(path_, star.id!.toString()));
      })
    }

    saveStar(star: Star, path_: string) {
      fs.mkdirSync(path_);
      this.writeMetaFile(path_, {
        "name": star.name
      });
      let save = this;
      save.saveAtomicGrid3d(star.model, path.join(path_, 'model'));
      star.planetsOrbiting.forEach(function (planet: Planet) {
        save.savePlanet(planet, path.join(path_, planet.id!.toString()));
      });
    }

    saveAtomicGrid3d(grid: AtomicGrid3D, path_: string) {
      fs.mkdirSync(path_);
      this.writeMetaFile(path_, {
        "stateOfMatter": grid.stateOfMatter
      });
      for (let x = 0; x < grid.width; x++) {
        let xPath = path.join(path_, x.toString());
        fs.mkdirSync(xPath);
        for (let y=0; y<grid.height; y++) {
          let yPath = path.join(xPath, y.toString());
          fs.mkdirSync(yPath);
          for (let z=0; z<grid.depth; z++) {
                let zPath = path.join(yPath, z.toString());
                let atom = grid.getItem(new Vector3D(x,y,z));
                this.writeFile(path.join(zPath, 'atom.dat'), {
                      "electrons": atom.electrons,
                      "neutrons": atom.neutrons,
                      "protons": atom.protons,
                      "stateOfMatter": atom.stateOfMatter,
                      "isTransparent": atom.isTransparent
                });
              }
        }
      }
    }

    savePlanet(planet: Planet, path_: string) {
      fs.mkdirSync(path_);
      this.writeMetaFile(path_, {
        "id": planet.id!,
        "name": planet.name!
      });
      this.saveAtomicGrid3d(planet.model, path.join(path_, 'model'));
    }

    load(){
      console.log('Loading save');
/*
      console.log('Loading main data file');
      let mainDataFile = path.join(this.path, 'universe.dat');
      let universeToLoad: any | Universe = msgpack.decode(fs.readFileSync(mainDataFile));
      console.log('Loading objects');
      let objectsFile = path.join(this.path, 'objects.dat');
      let objectsToLoad: any | Array<Object_> = msgpack.decode(fs.readFileSync(objectsFile));
      this.server.universe = universeToLoad;
      this.server.objects = objectsToLoad;
*/
    }


    readCount(path_: string) {
      let fileList_ = fs.readdirSync(path_);
      let fileList: Array<string> = [];
      for (let index = 0; index < fileList_.length; index++) {
        const file = fileList_[index]!;
        if (isNumber(parseInt(file))) {
          fileList.push(file);
        }
      }

      let width = fileList.length;
      return width;
    }

    loadAtomicGrid3d(path_: string): AtomicGrid3D {      
      console.log(`Loading voxel grid at ${path_}`);
      let data: any = this.readMetaFile(path_);
      let width = this.readCount(path_);
      let height = this.readCount(path.join(path_, '0'));
      let depth = this.readCount(path.join(path_, '0', '0'));
      let output = new AtomicGrid3D(width,height,depth,StatesOfMatter.Solid);
      output.stateOfMatter=data['stateOfMatter'];

      for (let x=0; x<width; x++) {
        for (let y=0; y<height; y++) {
          for (let z=0; z<depth; z++) {
            let atomData: any = this.readFile(path.join(path_, x.toString(), y.toString(), z.toString()));
            let position = new Vector3D(x,y,z);
            let atom = new Atom(atomData['electrons'], atomData['neutrons'], atomData['protons'], position, atomData['stateOfMatter']);
            atom.isTransparent=atomData['isTransparent'];
            output.setItem(position, atom);
          }
        }
      }
      

      return output;
    }

    loadPlanet(path_: string) {
      let planetData: any = this.readMetaFile(path_);
      
    }
}