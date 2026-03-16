import { AComponent } from './AComponent.js';
class HypersimComponent implements AComponent{
    schema: object;
    constructor(){
        this.schema={
            "server": {
                "default": "127.0.0.1:37008"
            }
        }
    }

    init(){

    }

}