import { fileURLToPath } from 'node:url';
// Data state
export let state={};
export let isGamePaused=false;
export const __filename =  fileURLToPath(import.meta.url);
// Main loop
export function tick(){
    // Placeholder: print "Hello World!"
    console.log("Hello World!");
}

export function pauseGame(){
    isGamePaused=true;
}

export function resumeGame(){
    isGamePaused=false;
}