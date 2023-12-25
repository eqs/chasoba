import { error, Attributes } from './utils';

export class Vector implements Attributes {

  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  sub(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  mul(t: number): Vector {
    return new Vector(this.x * t, this.y * t);
  }

  div(t: number): Vector {
    return new Vector(this.x / t, this.y / t);
  }

  dot(v: Vector): number {
    return this.x * v.x + this.y * v.y;
  }

  mag(): number {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  normal(): Vector {
    return this.div(this.mag());
  }

  angle(): number {
    return Math.atan2(this.y, this.x);
  }

  perpXY(v: Vector): Vector {
    // -| operator
    return new Vector(this.x, v.y);
  }

  perpYX(v: Vector): Vector {
    // |- operator
    return new Vector(v.x, this.y);
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }

  clone(): Vector {
    return new Vector(this.x, this.y);
  }

  toString(): string {
    return `Vector { x: ${this.x}, y: ${this.y} }`;
  }

  getAttribute(attr: any) {
    if (attr == 'mag') {
      return this.mag();
    } else if (attr == 'len') {
      return this.mag();
    } else if (attr == 'normal') {
      return this.normal();
    } else if (attr == 'angle') {
      return this.angle();
    } else if (attr == 'x') {
      return this.getX();
    } else if (attr == 'y') {
      return this.getY();
    } else {
      error(`ERROR: Value ${this} has no attr = ${attr}`);
    }
  }
}
