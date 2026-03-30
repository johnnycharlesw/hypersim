import * as fs from 'fs';
import toml from '@iarna/toml';
import { join } from 'path';

export class ConfigParser {
    configFile: string = 'game.config.toml';
    config: any;
    constructor(configFile: string | null | undefined){
        if (configFile) {
            this.configFile=configFile;
        }
        this.config={};
        fs.copyFile(join(import.meta.dirname, 'game.config.template.toml'), this.configFile, ()=>{
            this.parse();
            return;
        });
        this.parse();
        
    }

    parse(){
        let tomlContent = fs.readFileSync(this.configFile, 'utf-8');
        this.config = toml.parse(tomlContent);

    }
}