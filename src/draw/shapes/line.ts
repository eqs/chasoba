import * as svg from '../svg';
import { Shape, HasAnchor, HasLineAnchor } from './base';
import { Vector, rad2deg } from '../../math';
import { error, Attributes } from '../../utils';

export function lineBetweenShapes(s1: HasAnchor, s2: HasAnchor) {
  const dir = s2.center().sub(s1.center());
  const start = s1.direction(rad2deg(dir.angle()));
  const end = s2.direction(rad2deg(dir.angle() + Math.PI));
  return new Line({ x1: start.x, y1: start.y, x2: end.x, y2: end.y});
}

export interface LineArgs {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export class Line extends Shape implements Attributes, HasLineAnchor {

  x1: number;
  y1: number;
  x2: number;
  y2: number;

  constructor(args: LineArgs) {
    super();

    const {
      x1,
      y1,
      x2,
      y2,
    } = {
      ...args
    };

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  render(): svg.SVGPrimitive {
    return new svg.Line({
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
    });
  }

  start(): Vector {
    return new Vector(this.x1, this.y1);
  }

  end(): Vector {
    return new Vector(this.x2, this.y2);
  }

  internalDivision(t: number): Vector {
    const dir = this.end().sub(this.start());
    const mag = dir.mag();
    const n = dir.normal();
    return this.start().add(n.mul(mag * t));
  }

  getAttribute(attr: any) {
    if (attr == 'x1') {
      return this.x1;
    } else if (attr == 'y1') {
      return this.y1;
    } else if (attr == 'x2') {
      return this.x2;
    } else if (attr == 'y2') {
      return this.y2;
    } else if (attr == 'start') {
      return this.start();
    } else if (attr == 'end') {
      return this.end();
    } else if (typeof attr == 'number') {
      return this.internalDivision(attr);
    } else {
      error(`ERROR: Value ${this} has no attr = ${attr}`);
    }
  }
}
