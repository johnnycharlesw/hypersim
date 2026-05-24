import { Color } from "../../../../common/colorManagement/Color";
import { Vector2D } from "../../../../common/vectors";

export class Triangle {
    point1: Vector2D;
    point2: Vector2D;
    point3: Vector2D;
    color: Color;

    constructor(point1: Vector2D, point2: Vector2D, point3: Vector2D, color: Color) {
      this.point1=point1;
      this.point2=point2;
      this.point3=point3;
      this.color=color;
    }
}