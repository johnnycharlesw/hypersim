import type { AComponent } from './AComponent.js';
export class HypersimComponent implements AComponent{
    schema: object;
    constructor(){
        this.schema={
            "server": {
                "default": "127.0.0.1:37008"
            }
        }
    }

    init(): null{

        return null;
    }

    update(): null {
        return null;
    }
    tick(): null {
        return null;
    }
    pause(): null {
        return null;
    }

    play(): null {
        return null;
    }

    remove(): null {
        return null;
    }
}