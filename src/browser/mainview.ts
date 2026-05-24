import { TriangleCanvas } from "./game/rendering/triangleRenderer/TriangleCanvas";

//@ts-ignore
let canvas: HTMLCanvasElement = document.getElementById('canvas')!;

document.addEventListener('keydown', (e)=>{
    if (e.key=="Escape") {
        window.location.replace(window.location.href.replace('play.html', 'index.html'));
    }
})

let triCanvas = new TriangleCanvas(canvas, 'software');
