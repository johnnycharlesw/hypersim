import { Triangle } from "./Triangle";
import { TriangleRenderingContext } from "./TriangleRenderingContext";

export class SoftwareTriangleRenderingContext implements TriangleRenderingContext {
    canvas: HTMLCanvasElement;
    canvasCtx: CanvasRenderingContext2D;
    ctxSettings: CanvasRenderingContext2DSettings;
    triangles: Triangle[];
    constructor(canvas: HTMLCanvasElement) {
        this.canvas=canvas;
        this.triangles=[];
        this.ctxSettings = {
            "colorSpace": "srgb",
            "alpha": false
        }
        this.canvasCtx=this.canvas.getContext('2d', this.ctxSettings)!;
    }

    drawTriangle(triangle: Triangle): number {
        this.triangles.concat(triangle);
        let path: Path2D = new Path2D();
        path.moveTo(triangle.point1.x, triangle.point1.y);
        path.lineTo(triangle.point2.x, triangle.point2.y);
        path.moveTo(triangle.point2.x, triangle.point2.y);
        path.lineTo(triangle.point3.x, triangle.point3.y);
        path.moveTo(triangle.point3.x, triangle.point3.y);
        path.lineTo(triangle.point1.x, triangle.point1.y);
        path.moveTo(triangle.point1.x, triangle.point1.y);
        this.canvasCtx.fillStyle=`#${triangle.color.toHexColor().toString(16)}`;
        this.canvasCtx.fill(path);
        return this.triangles.indexOf(triangle);
    }

    applyShader(shader: string, type: string): void {
        // stub, 2d rendering apis don't support shaders (although, for a game this complex I don't expect anyone run it on such old hardware but here we are anyways)
    }

    clear(): void {
        this.canvasCtx.fillStyle = "#000000";
        this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}