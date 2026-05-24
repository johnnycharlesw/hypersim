import { Triangle } from "./Triangle";
import { TriangleRenderingContext } from "./TriangleRenderingContext";

export class WebGLTriangleRenderingContext implements TriangleRenderingContext {
    canvas: HTMLCanvasElement;
    canvasCtx: WebGL2RenderingContext;
    ctxSettings: WebGLContextAttributes;
    //@ts-ignore
    vertexShader: WebGLShader;
    //@ts-ignore
    fragmentShader: WebGLShader;
    //@ts-ignore
    shaderProgram: WebGLProgram;

    triangles: Triangle[];
    constructor(canvas: HTMLCanvasElement) {
        this.canvas=canvas;
        this.triangles=[];
        this.ctxSettings={
            "alpha": false,
            "antialias": true,
            "failIfMajorPerformanceCaveat": false,
            "xrCompatible": true
        }
        this.canvasCtx=this.canvas.getContext('webgl2', this.ctxSettings)!;
        let renderer = this;
        
        renderer.vertexShader=renderer.compileShader('','vertex')!;
        renderer.fragmentShader=renderer.compileShader('','fragment')!;
        this.applyDefaultShaders()
    }

    drawTriangle(triangle: Triangle): number {
        this.triangles.concat(triangle);
        /*
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
        */
        return this.triangles.indexOf(triangle);
    }

    applyShader(shader: string, type: string): void {
        switch (type) {
            case 'vertex':
                this.vertexShader = this.compileShader(shader, type)!;
                break;
            case 'fragment':
            default:
                this.fragmentShader = this.compileShader(shader, type)!;
                break;
        }
        this.shaderProgram = this.createShaderProgram(this.vertexShader, this.fragmentShader)!;
    }

    async applyDefaultShaders(){
        let renderer = this;
        
      fetch('shaders/vertex/triangle.glsl').then(async function (defaultVertexShaderResponse: Response) {
        let defaultVertexShader = await defaultVertexShaderResponse.text();
        fetch('shaders/fragment/triangle.glsl').then(async function (defaultFragmentShaderResponse: Response) {
            let defaultFragmentShader = await defaultFragmentShaderResponse.text();
            renderer.vertexShader = renderer.compileShader(defaultVertexShader, 'vertex')!;
            renderer.fragmentShader = renderer.compileShader(defaultFragmentShader, 'fragment')!;
            renderer.createShaderProgram(renderer.vertexShader, renderer.fragmentShader);
        })
      })
      this.canvasCtx.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    compileShader(shader: string, type: string): WebGLShader | null {
      let type_id: number;
      switch (type) {
        case 'vertex':
            type_id = this.canvasCtx.VERTEX_SHADER;
            break;
        case 'fragment':
        default:
            type_id = this.canvasCtx.FRAGMENT_SHADER;
            break;
      }
      let glShader: WebGLShader = this.canvasCtx.createShader(type_id)!;
      this.canvasCtx.shaderSource(glShader, shader);
      this.canvasCtx.compileShader(glShader);
      let success = this.canvasCtx.getShaderParameter(glShader, this.canvasCtx.COMPILE_STATUS);
      if (success) {
        return shader;
      } else {
        this.canvasCtx.deleteShader(glShader);
        return null;
      }
    }

    createShaderProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
      let program: WebGLProgram = this.canvasCtx.createProgram()!;
      this.canvasCtx.attachShader(program, vertexShader);
      this.canvasCtx.attachShader(program, fragmentShader);
      this.canvasCtx.linkProgram(program);
      let success: boolean = this.canvasCtx.getProgramParameter(program, this.canvasCtx.LINK_STATUS);
      if (success) {
        return program;
      } else {
        this.canvasCtx.deleteProgram(program);
        return null;
      }
      
    }

    clear(): void {
        this.canvasCtx.clearColor(0,0,0,0);
    }
}