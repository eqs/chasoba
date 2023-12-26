import * as svg from '../svg';
import { Shape, HasAnchor } from './base';
import { Rectangle } from './rectangle';
import { Vector, deg2rad } from '../../math';
import { error, Attributes } from '../../utils';

export interface TextBoxArgs {
  text: string;
  x: number;
  y: number;
  padding?: number;
  margin?: number;
  fontSize?: number;
  on?: Shape;
}

export class TextBox extends Shape implements Attributes, HasAnchor {

  text: string;
  x: number;
  y: number;
  padding: number;
  margin: number;
  fontSize: number;
  on: any;  // should be <Shape implements HasAnchor>

  constructor(args: TextBoxArgs) {
    super();

    const {
      text,
      x,
      y,
      padding,
      margin,
      fontSize,
      on,
    } = {
      ...args
    };

    this.text = text;
    this.x = x;
    this.y = y;
    this.padding = padding ?? 0;
    this.margin = margin ?? 8;
    this.fontSize = fontSize ?? 24;
    this.on = on ?? new Rectangle({
      x: this.x,
      y: this.y,
      width: this.fontSize * this.text.length + this.margin * 2,
      height: this.fontSize + this.margin * 2
    });
  }

  render(): svg.SVGPrimitive {
    let elements = [
      this.on.render(),
      new svg.TextElement({
        text: this.text,
        x: this.x,
        y: this.y,
        fontSize: this.fontSize,
        shapeInside: `url(#${this.on.id})`,
        shapeMargin: this.margin,
        shapePadding: this.padding
      })
    ];

    return new svg.Group({ elements });
  }

  center(): Vector {
    return this.on.center();
  }

  north(): Vector {
    return this.on.north();
  }

  east(): Vector {
    return this.on.east();
  }

  west(): Vector {
    return this.on.west();
  }

  south(): Vector {
    return this.on.south();
  }

  direction(dir: number): Vector {
    return this.on.direction(dir);
  }

  getAttribute(attr: any) {
    if (attr == 'x') {
      return this.x;
    } else if (attr == 'y') {
      return this.y;
    } else if (attr == 'text') {
      return this.text;
    } else if (attr == 'on') {
      return this.on;
    } else if (attr == 'font_size') {
      return this.fontSize;
    } else if (attr == 'padding') {
      return this.padding;
    } else if (attr == 'margin') {
      return this.margin;
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
