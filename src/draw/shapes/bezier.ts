import * as svg from '../svg';
import { Shape, HasAnchor, HasLineAnchor } from './base';
import { Vector, rad2deg } from '../../math';
import { error, Attributes } from '../../utils';

export interface BezierCurveArgs {
  p0: Vector;
  p1: Vector;
  p2: Vector;
}

export class BezierCurve extends Shape implements Attributes, HasLineAnchor {

  p0: Vector;
  p1: Vector;
  p2: Vector;

  constructor(args: BezierCurveArgs) {
    super();

    const {
      p0,
      p1,
      p2,
    } = {
      ...args
    };

    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
  }

  render(): svg.SVGPrimitive {
    return new svg.BezierCurve({
      p0: this.p0,
      p1: this.p1,
      p2: this.p2,
    });
  }

  start(): Vector {
    return this.p0;
  }

  end(): Vector {
    return this.p2;
  }

  internalDivision(t: number): Vector {
    // p(t) = (1-t)**2 * p0 + 2*t*(1-t)*p1 + t**2 * p2
    return (
      this.p0.mul((1-t)*(1-t))
        .add(this.p1.mul(2*t*(1-t)))
        .add(this.p2.mul(t*t))
    );
  }

  bend(sign: number): Shape {
    const dir = this.end().sub(this.start());
    const mag = dir.mag();
    const bendAngle = dir.angle() + sign * Math.PI / 2;
    const bendStep = new Vector(
      (mag * 0.5) * Math.cos(bendAngle),
      (mag * 0.5) * Math.sin(bendAngle),
    );
    return new BezierCurve({
      p0: this.p0,
      p1: this.p1.add(bendStep),
      p2: this.p2,
    });
  }

  bendLeft(): Shape {
    return this.bend(-1);
  }

  bendRight(): Shape {
    return this.bend(1);
  }

  getAttribute(attr: any) {
    if (attr == 'start') {
      return this.start();
    } else if (attr == 'end') {
      return this.end();
    } else if (attr == 'bend_left') {
      return this.bendLeft();
    } else if (attr == 'bend_right') {
      return this.bendRight();
    } else if (typeof attr == 'number') {
      return this.internalDivision(attr);
    } else {
      error(`ERROR: Value ${this} has no attr = ${attr}`);
    }
  }
}
