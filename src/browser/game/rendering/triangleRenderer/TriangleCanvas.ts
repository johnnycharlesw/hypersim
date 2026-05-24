import { SoftwareTriangleRenderingContext } from "./SoftwareTriangleRenderingContext";
import { TriangleRenderingContext } from "./TriangleRenderingContext";
import { WebGLTriangleRenderingContext } from './WebGLTriangleRenderingContext';

export class TriangleCanvas {
    canvas: HTMLCanvasElement;
    ctx: TriangleRenderingContext;
    constructor(canvas: HTMLCanvasElement, contextType: string) {
        this.canvas=canvas;
        switch (contextType) {
            case 'software':
                this.ctx=new SoftwareTriangleRenderingContext(this.canvas);
                break;
            case 'webgl':
            default:
                this.ctx = new WebGLTriangleRenderingContext(this.canvas);
                break;
        }
    }
}