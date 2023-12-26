import * as svg from '../svg';
import { Shape, HasAnchor } from './base';
import { Vector, deg2rad } from '../../math';
import { error, Attributes } from '../../utils';

export interface CircleArgs {
  cx: number;
  cy: number;
  r: number;
}

export class Circle extends Shape implements Attributes, HasAnchor {

  cx: number;
  cy: number;
  r: number;

  constructor(args: CircleArgs) {
    super();

    const {
      cx,
      cy,
      r,
    } = {
      ...args
    };

    this.cx = cx;
    this.cy = cy;
    this.r = r;
  }

  render(): svg.SVGPrimitive {
    return new svg.Circle({
      cx: this.cx,
      cy: this.cy,
      r: this.r,
    });
  }

  center(): Vector {
    return new Vector(this.cx, this.cy);
  }

  north(): Vector {
    return new Vector(this.cx, this.cy - this.r);
  }

  east(): Vector {
    return new Vector(this.cx + this.r, this.cy);
  }

  west(): Vector {
    return new Vector(this.cx - this.r, this.cy);
  }

  south(): Vector {
    return new Vector(this.cx, this.cy + this.r);
  }

  direction(dir: number): Vector {
    const t = deg2rad(dir % 360);
    dir = dir % 360;

    return new Vector(
      this.cx + this.r * Math.cos(t),
      this.cy + this.r * Math.sin(t)
    );
  }


  getAttribute(attr: any) {
    if (attr == 'x') {
      return this.cx;
    } else if (attr == 'y') {
      return this.cy;
    } else if (attr == 'r') {
      return this.r;
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
