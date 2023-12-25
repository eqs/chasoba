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
    let s = `<?xml version="1.0" standalone="no" ?>
<svg width="${this.width}" height="${this.height}" xmlns="http://www.w3.org/2000/svg" version="2.0">\n`;
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

export class Point {

  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `${this.x},${this.y}`;
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

  // constructor(color: Color, width: number, lineCap?: LineCap, lineJoin?: LineJoin) {
  constructor(color: Color, width: number) {
    this.color = color;
    this.width = width;
    // this.lineCap = lineCap === undefined ? 'Butt' : lineCap;
    // this.lineJoin = lineJoin === undefined ? 'Miter' : lineJoin;
    this.lineCap = 'Butt';
    this.lineJoin = 'Miter';
  }

  static getDefault() {
    return new StrokeStyle(
      Color.getDefault(),
      2.0,
      // 'Butt',
      // 'Miter',
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
    let s = '<g fill="none" stroke="none">\n';
    this.elements.map((e: SVGPrimitive) => {
      s += e.toSvgTag() + '\n';
    });
    s += '</g>\n';

    return s;
  }
}

// https://www.w3.org/TR/SVG2/shapes.html#RectElement
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

  toSvgTag(): string {
    let s = `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" rx="${this.rx}" ry="${this.ry}" `;
    s += ` fill="${this.fillStyle.color.getRGB8()}" stroke="${this.strokeStyle.color.getRGB8()}"`;
    s += ` fill-opacity="${this.fillStyle.color.getOpacity()}" stroke-opacity="${this.strokeStyle.color.getOpacity()}"`;
    s += ` stroke-width="${this.strokeStyle.width}"`
    s += ' />\n';
    return s;
  }
}

// https://www.w3.org/TR/SVG2/shapes.html#CircleElement
export class Circle implements SVGPrimitive {

  cx: number;
  cy: number;
  r: number;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;

  constructor(cx: number, cy: number, r: number, fillStyle?: FillStyle, strokeStyle?: StrokeStyle) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.fillStyle = fillStyle === undefined ? FillStyle.getDefault() : fillStyle;
    this.strokeStyle = strokeStyle === undefined ? StrokeStyle.getDefault() : strokeStyle;
  }

  toSvgTag(): string {
    let s = `<circle cx="${this.cx}" cy="${this.cy}" r="${this.r}" `;
    s += ` fill="${this.fillStyle.color.getRGB8()}" stroke="${this.strokeStyle.color.getRGB8()}"`;
    s += ` fill-opacity="${this.fillStyle.color.getOpacity()}" stroke-opacity="${this.strokeStyle.color.getOpacity()}"`;
    s += ` stroke-width="${this.strokeStyle.width}"`
    s += ' />\n';
    return s;
  }
}

// https://www.w3.org/TR/SVG2/shapes.html#EllipseElement
export class Ellipse implements SVGPrimitive {

  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;

  constructor(cx: number, cy: number, rx: number, ry: number, fillStyle?: FillStyle, strokeStyle?: StrokeStyle) {
    this.cx = cx;
    this.cy = cy;
    this.rx = rx;
    this.ry = ry;
    this.fillStyle = fillStyle === undefined ? FillStyle.getDefault() : fillStyle;
    this.strokeStyle = strokeStyle === undefined ? StrokeStyle.getDefault() : strokeStyle;
  }

  toSvgTag(): string {
    let s = `<ellipse cx="${this.cx}" cy="${this.cy}" rx="${this.rx}" ry="${this.ry}" `;
    s += ` fill="${this.fillStyle.color.getRGB8()}" stroke="${this.strokeStyle.color.getRGB8()}"`;
    s += ` fill-opacity="${this.fillStyle.color.getOpacity()}" stroke-opacity="${this.strokeStyle.color.getOpacity()}"`;
    s += ` stroke-width="${this.strokeStyle.width}"`
    s += ' />\n';
    return s;
  }
}

// https://www.w3.org/TR/SVG2/text.html
export class TextElement implements SVGPrimitive {

  text: string;
  x: number;
  y: number;
  fontSize: number;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
  fontFamily: string;
  textAnchor: string;
  dominantBaseline: string;

  constructor(text: string, x: number, y: number, fontSize: number, fillStyle?: FillStyle, strokeStyle?: StrokeStyle) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.fillStyle = fillStyle === undefined ? FillStyle.getDefault() : fillStyle;
    this.strokeStyle = strokeStyle === undefined ? StrokeStyle.getDefault() : strokeStyle;

    this.fontFamily = 'Verdana'
    this.textAnchor = 'middle'
    this.dominantBaseline = 'central'
  }

  toSvgTag(): string {
    let s = `<text x="${this.x}" y="${this.y}" font-size="${this.fontSize}" font-family="${this.fontFamily}" text-anchor="${this.textAnchor}" dominant-baseline="${this.dominantBaseline}" `;
    s += ` fill="${this.fillStyle.color.getRGB8()}" stroke="${this.strokeStyle.color.getRGB8()}"`;
    s += ` fill-opacity="${this.fillStyle.color.getOpacity()}" stroke-opacity="${this.strokeStyle.color.getOpacity()}"`;
    s += ` stroke-width="${this.strokeStyle.width}"`
    s += ' >\n';
    s += this.text + '\n';
    s += '</text>\n';
    return s;
  }
}

// https://www.w3.org/TR/SVG2/shapes.html#LineElement
export class Line implements SVGPrimitive {

  x1: number;
  y1: number;
  x2: number;
  y2: number;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;

  constructor(x1: number, y1: number, x2: number, y2: number, strokeStyle?: StrokeStyle) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.strokeStyle = strokeStyle === undefined ? StrokeStyle.getDefault() : strokeStyle;

    this.fillStyle = FillStyle.getDefault();
  }

  toSvgTag(): string {
    let s = `<line x1="${this.x1}" y1="${this.y1}" x2="${this.x2}" y2="${this.y2}" `;
    s += ` stroke="${this.strokeStyle.color.getRGB8()}"`;
    s += ` stroke-opacity="${this.strokeStyle.color.getOpacity()}"`;
    s += ` stroke-width="${this.strokeStyle.width}"`
    s += ' />\n';
    return s;
  }
}

export class Polyline implements SVGPrimitive {

  points: Point[];
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;

  constructor(points: Point[], fillStyle?: FillStyle, strokeStyle?: StrokeStyle) {
    this.points = points;
    this.fillStyle = fillStyle === undefined ? FillStyle.getDefault() : fillStyle;
    this.strokeStyle = strokeStyle === undefined ? StrokeStyle.getDefault() : strokeStyle;
  }

  toSvgTag(): string {
    let pointsString = this.points.map((p: Point) => p.toString()).join(' ')

    let s = `<polyline points="${pointsString}" `;
    s += ` fill="${this.fillStyle.color.getRGB8()}" stroke="${this.strokeStyle.color.getRGB8()}"`;
    s += ` fill-opacity="${this.fillStyle.color.getOpacity()}" stroke-opacity="${this.strokeStyle.color.getOpacity()}"`;
    s += ` stroke-width="${this.strokeStyle.width}"`
    s += ' />\n';
    return s;
  }
}

// https://www.w3.org/TR/SVG2/shapes.html#PolygonElement
export class Polygon implements SVGPrimitive {

  points: Point[];
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;

  constructor(points: Point[], fillStyle?: FillStyle, strokeStyle?: StrokeStyle) {
    this.points = points;
    this.fillStyle = fillStyle === undefined ? FillStyle.getDefault() : fillStyle;
    this.strokeStyle = strokeStyle === undefined ? StrokeStyle.getDefault() : strokeStyle;
  }

  toSvgTag(): string {
    let pointsString = this.points.map((p: Point) => p.toString()).join(' ')

    let s = `<polygon points="${pointsString}" `;
    s += ` fill="${this.fillStyle.color.getRGB8()}" stroke="${this.strokeStyle.color.getRGB8()}"`;
    s += ` fill-opacity="${this.fillStyle.color.getOpacity()}" stroke-opacity="${this.strokeStyle.color.getOpacity()}"`;
    s += ` stroke-width="${this.strokeStyle.width}"`
    s += ' />\n';
    return s;
  }
}
