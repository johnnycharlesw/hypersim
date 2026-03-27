import { existsSync } from "fs";
import { Universe } from "../../common/geography/Universe.js";
import { ConfigParser } from "../ConfigParser.js";

export class Server {
    configParser: ConfigParser;
    universe: Universe;
    constructor() {
        this.configParser=new ConfigParser(undefined);
        if (!existsSync(this.configParser.config['universe']['path'])) {
            this.universe = new Universe();
        } else {
            this.universe = new Universe();
        }
    }
}