import {Vector2D} from '../../../../common/vectors';
import {Color} from '../../../../common/colorManagement/Color';
import { Triangle } from './Triangle';
export interface TriangleRenderingContext {
    canvas: HTMLCanvasElement;
    triangles: Array<Triangle>;

    drawTriangle(triangle: Triangle): number;
    applyShader(shader: string, type: string): void;
    clear(): void;

}