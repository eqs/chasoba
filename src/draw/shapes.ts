import * as svg from './svg';
import { Vector, deg2rad } from '../math';
import { error, Attributes } from '../utils';

export abstract class Shape {
  abstract render(): svg.SVGPrimitive;
}

export interface HasAnchor {
  center(): Vector;
  north(): Vector;
  east(): Vector;
  west(): Vector;
  south(): Vector;
  direction(dir: number): Vector;
}

export interface RectangleArgs {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Rectangle extends Shape implements Attributes, HasAnchor {

  x: number;
  y: number;
  width: number;
  height: number;

  constructor(args: RectangleArgs) {
    super();

    const {
      x,
      y,
      width,
      height,
    } = {
      ...args
    };

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  render(): svg.SVGPrimitive {
    return new svg.Rectangle({
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height
    });
  }

  center(): Vector {
    return new Vector(this.x, this.y);
  }

  north(): Vector {
    return new Vector(this.x, this.y - this.height / 2);
  }

  east(): Vector {
    return new Vector(this.x + this.width / 2, this.y);
  }

  west(): Vector {
    return new Vector(this.x - this.width / 2, this.y);
  }

  south(): Vector {
    return new Vector(this.x, this.y + this.height / 2);
  }

  direction(dir: number): Vector {
    const t = deg2rad(dir % 360);
    dir = dir % 360;

    if (315 <= dir || dir < 45) {
      return new Vector(
        this.x + this.width / 2,
        this.y + this.height / 2 * Math.tan(t)
      );
    } else if (45 <= dir && dir < 135) {
      return new Vector(
        this.x - this.width / 2 * Math.tan(t - deg2rad(90)),
        this.y + this.height / 2
      );
    } else if (135 <= dir && dir < 225) {
      return new Vector(
        this.x - this.width / 2,
        this.y - this.height / 2 * Math.tan(t - deg2rad(180))
      );
    } else {
      return new Vector(
        this.x + this.width / 2 * Math.tan(t - deg2rad(270)),
        this.y - this.height / 2
      );
    }
  }

  getAttribute(attr: any) {
    if (attr == 'x') {
      return this.x;
    } else if (attr == 'y') {
      return this.y;
    } else if (attr == 'w') {
      return this.width;
    } else if (attr == 'h') {
      return this.height;
    } else if (attr == 'center') {
      return this.center();
    } else if (attr == 'north') {
      return this.north();
    } else if (attr == 'east') {
      return this.east();
    } else if (attr == 'west') {
      return this.west();
    } else if (attr == 'south') {
      return this.south();
    } else if (typeof attr == 'number') {
      return this.direction(attr);
    } else {
      error(`ERROR: Value ${this} has no attr = ${attr}`);
    }
  }
}
