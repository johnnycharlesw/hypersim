import * as fs from 'fs';
import toml from '@iarna/toml';

export class ConfigParser {
    configFile: string = 'game.config.toml';
    config: object;
    constructor(configFile: string | null | undefined){
        if (configFile) {
            this.configFile=configFile;
        }
        if (!(fs.existsSync(this.configFile))) {
            fs.copyFile('game.config.template.toml', this.configFile);
        }
        this.config={};
        this.parse();
    }

    parse(){
        let tomlContent = fs.readFileSync(this.configFile, 'utf-8');
        this.config = toml.parse(tomlContent);

    }
}