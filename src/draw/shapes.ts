import * as svg from './svg';
import { error, Attributes } from '../utils';

export abstract class Shape {
  abstract render(): svg.SVGPrimitive;
}

export class Rectangle extends Shape implements Attributes {

  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  render(): svg.SVGPrimitive {
    return new svg.Rectangle(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
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
    } else {
      error(`ERROR: Value ${this} has no attr = ${attr}`);
    }
  }
}
