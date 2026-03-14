import * as ollama from 'ollama';
import {NPC} from './NPC.js';
import { CharacterController } from './CharacterController.js';
export class NPC_AI extends CharacterController {
    ollamaConnection: ollama.Ollama;
    constructor(character: NPC){
        super(character);
        this.ollamaConnection = new ollama.Ollama();
        // Note: Ollama client does not expose an 'on' event API in this version; replace with actual request/response calls when integrating.
    }

    tick(): void{
        return;
    }

    haveCharacterAct(response: any): void {
        if (response.status === 'success') {
            console.log('Character has acted!');
            this.lastAction = JSON.parse(response.data);
            this.lastAction.timestamp = new Date();
        } else {
            console.error('Error from Ollama:', response.error);
        }
    }
}
