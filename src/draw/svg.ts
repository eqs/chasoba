export type LineCap = 'Butt' | 'Round';
export type LineJoin = 'Miter' | 'Round' | 'Bevel';

export class SVGDocument {

  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  render(element: SVGPrimitive): string {
    let s = `
    <?xml version="1.0" standalone="no" ?>
    <svg width="${this.width}" height="${this.height}" xmlns="http://www.w3.org/2000/svg" version="2.0">
    `;
    s += element.toSvgTag();
    s += '</svg>';

    return s;
  }
}

export class Color {

  r: number;
  g: number;
  b: number;
  a: number;

  constructor(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  getRGB8() {
    return `rgb(${this.r * 255}, ${this.g * 255}, ${this.b * 255})`;
  }

  getOpacity() {
    return `${this.a}`;
  }

  static getDefault() {
    return new Color(0.0, 0.0, 0.0, 1.0);
  }
}

export class FillStyle {

  color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  static getDefault() {
    return new FillStyle(new Color(1.0, 1.0, 1.0, 1.0));
  }
}

export class StrokeStyle {

  color: Color;
  width: number;
  lineCap: LineCap;
  lineJoin: LineJoin;

  constructor(color: Color, width: number, lineCap?: LineCap, lineJoin?: LineJoin) {
    this.color = color;
    this.width = width;
    this.lineCap = lineCap === undefined ? 'Butt' : lineCap;
    this.lineJoin = lineJoin === undefined ? 'Miter' : lineJoin;
  }

  static getDefault() {
    return new StrokeStyle(
      Color.getDefault(),
      2.0,
      'Butt',
      'Miter',
    );
  }
}

export interface SVGPrimitive {

  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;

  toSvgTag(): string;
}

export class Group implements SVGPrimitive {

  elements: SVGPrimitive[];
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;

  constructor(elements: SVGPrimitive[]) {
    this.elements = elements;
    this.fillStyle = FillStyle.getDefault();
    this.strokeStyle = StrokeStyle.getDefault();
  }

  toSvgTag() {
    let s = '<g fill="none" stroke="none">';
    this.elements.map((e: SVGPrimitive) => {
      s += e.toSvgTag() + '\n';
    });
    s += '</g>\n';

    return s;
  }
}

export class Rectangle implements SVGPrimitive {

  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  ry: number;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;

  constructor(x: number, y: number, width: number, height: number, rx?: number, ry?: number, fillStyle?: FillStyle, strokeStyle?: StrokeStyle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rx = rx === undefined ? 0.0 : rx;
    this.ry = ry === undefined ? 0.0 : ry;
    this.fillStyle = fillStyle === undefined ? FillStyle.getDefault() : fillStyle;
    this.strokeStyle = strokeStyle === undefined ? StrokeStyle.getDefault() : strokeStyle;
  }

  toSvgTag() {
    let s = `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" rx="${this.rx}" ry="${this.ry}" `;
    s += ` fill="${this.fillStyle.color.getRGB8()}" stroke="${this.strokeStyle.color.getRGB8()}"`;
    s += ` fill-opacity="${this.fillStyle.color.getOpacity()}" stroke-opacity="${this.strokeStyle.color.getOpacity()}"`;
    s += ` stroke-width="${this.strokeStyle.width}"`
    s += ' />\n';
    return s;
  }
}
