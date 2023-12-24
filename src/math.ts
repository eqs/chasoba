export class Vector {

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

  clone(): Vector {
    return new Vector(this.x, this.y);
  }

  toString(): string {
    return `Vector { x: ${this.x}, y: ${this.y} }`;
  }
}
