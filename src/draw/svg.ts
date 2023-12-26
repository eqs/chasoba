import { v4 as uuidv4 } from 'uuid';

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

  id: string;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;

  toSvgTag(): string;
}

export interface GroupArgs {
  id?: string;
  elements: SVGPrimitive[];
}

export class Group implements SVGPrimitive {

  id: string;
  elements: SVGPrimitive[];
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;

  constructor(args: GroupArgs) {

    const { id, elements } = { ...args };

    this.id = id ?? uuidv4();
    this.elements = elements;
    this.fillStyle = FillStyle.getDefault();
    this.strokeStyle = StrokeStyle.getDefault();
  }

  toSvgTag() {
    let s = `<g id="${this.id}" fill="none" stroke="none">\n`;
    this.elements.map((e: SVGPrimitive) => {
      s += e.toSvgTag() + '\n';
    });
    s += '</g>\n';

    return s;
  }
}

// https://www.w3.org/TR/SVG2/shapes.html#RectElement
export interface RectangleArgs {
  id?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  ry?: number;
  fillStyle?: FillStyle;
  strokeStyle?: StrokeStyle;
}

export class Rectangle implements SVGPrimitive {

  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  ry: number;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;

  public static defaults = {
    rx: 0.0,
    ry: 0.0,
    fillStyle: FillStyle.getDefault(),
    strokeStyle: StrokeStyle.getDefault(),
  };

  constructor(args: RectangleArgs) {

    const {
      id,
      x,
      y,
      width,
      height,
      rx,
      ry,
      fillStyle,
      strokeStyle,
    } = {
      ...args
    };

    this.id = id ?? uuidv4();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rx = rx ?? 0.0;
    this.ry = ry ?? 0.0;
    this.fillStyle = fillStyle ?? { ...Rectangle.defaults.fillStyle };
    this.strokeStyle = strokeStyle ?? { ...Rectangle.defaults.strokeStyle };
  }

  toSvgTag(): string {
    let s = `<rect id="${this.id}" x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" rx="${this.rx}" ry="${this.ry}" `;
    s += ` fill="${this.fillStyle.color.getRGB8()}" stroke="${this.strokeStyle.color.getRGB8()}"`;
    s += ` fill-opacity="${this.fillStyle.color.getOpacity()}" stroke-opacity="${this.strokeStyle.color.getOpacity()}"`;
    s += ` stroke-width="${this.strokeStyle.width}"`
    s += ' />\n';
    return s;
  }
}

// https://www.w3.org/TR/SVG2/shapes.html#CircleElement
export interface CircleArgs {
  id?: string;
  cx: number;
  cy: number;
  r: number;
  fillStyle?: FillStyle;
  strokeStyle?: StrokeStyle;
}

export class Circle implements SVGPrimitive {

  id: string;
  cx: number;
  cy: number;
  r: number;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;

  public static defaults = {
    fillStyle: FillStyle.getDefault(),
    strokeStyle: StrokeStyle.getDefault(),
  };

  constructor(args: CircleArgs) {

    const {
      id,
      cx,
      cy,
      r,
      fillStyle,
      strokeStyle,
    } = {
      ...args
    };

    this.id = id ?? uuidv4();
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.fillStyle = fillStyle ?? { ...Circle.defaults.fillStyle };
    this.strokeStyle = strokeStyle ?? { ...Circle.defaults.strokeStyle };
  }

  toSvgTag(): string {
    let s = `<circle id="${this.id}" cx="${this.cx}" cy="${this.cy}" r="${this.r}" `;
    s += ` fill="${this.fillStyle.color.getRGB8()}" stroke="${this.strokeStyle.color.getRGB8()}"`;
    s += ` fill-opacity="${this.fillStyle.color.getOpacity()}" stroke-opacity="${this.strokeStyle.color.getOpacity()}"`;
    s += ` stroke-width="${this.strokeStyle.width}"`
    s += ' />\n';
    return s;
  }
}

// https://www.w3.org/TR/SVG2/shapes.html#EllipseElement
export interface EllipseArgs {
  id?: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fillStyle?: FillStyle;
  strokeStyle?: StrokeStyle;
}

export class Ellipse implements SVGPrimitive {

  id: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;

  public static defaults = {
    fillStyle: FillStyle.getDefault(),
    strokeStyle: StrokeStyle.getDefault(),
  };

  constructor(args: EllipseArgs) {

    const {
      id,
      cx,
      cy,
      rx,
      ry,
      fillStyle,
      strokeStyle,
    } = {
      ...args
    };

    this.id = id ?? uuidv4();
    this.cx = cx;
    this.cy = cy;
    this.rx = rx;
    this.ry = ry;
    this.fillStyle = fillStyle ?? { ...Ellipse.defaults.fillStyle };
    this.strokeStyle = strokeStyle ?? { ...Ellipse.defaults.strokeStyle };
  }

  toSvgTag(): string {
    let s = `<ellipse id="${this.id}" cx="${this.cx}" cy="${this.cy}" rx="${this.rx}" ry="${this.ry}" `;
    s += ` fill="${this.fillStyle.color.getRGB8()}" stroke="${this.strokeStyle.color.getRGB8()}"`;
    s += ` fill-opacity="${this.fillStyle.color.getOpacity()}" stroke-opacity="${this.strokeStyle.color.getOpacity()}"`;
    s += ` stroke-width="${this.strokeStyle.width}"`
    s += ' />\n';
    return s;
  }
}

export interface TextArgs {
  id?:string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fillStyle?: FillStyle;
  strokeStyle?: StrokeStyle;
  fontFamily?: string;
  textAnchor?: string;
  textAlign?: string;
  dominantBaseline?: string;
  shapeInside?: string;
  shapeMargin?: number;
  shapePadding?: number;
}

// https://www.w3.org/TR/SVG2/text.html
export class TextElement implements SVGPrimitive {

  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;
  fontFamily: string;
  textAnchor: string;
  textAlign: string;
  dominantBaseline: string;
  shapeInside: string;
  shapeMargin: number;
  shapePadding: number;

  public static defaults = {
    fillStyle: new FillStyle(new Color(0.0, 0.0, 0.0, 1.0)),
    strokeStyle: new StrokeStyle(new Color(0.0, 0.0, 0.0, 0.0), 1),
    fontFamily: 'Verdana',
    textAnchor: 'middle',
    textAlign: 'center',
    dominantBaseline: 'central',
    shapeInside: '',
    shapeMargin: 0,
    shapePadding: 0,
  };

  constructor(args: TextArgs) {

    const {
      id,
      text,
      x,
      y,
      fontSize,
      fillStyle,
      strokeStyle,
      fontFamily,
      textAlign,
      dominantBaseline,
      shapeInside,
      shapeMargin,
      shapePadding,
    } = {
      ...args
    };

    this.id = id ?? uuidv4();
    this.text = text;
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;

    this.fillStyle = fillStyle ?? { ...TextElement.defaults.fillStyle };
    this.strokeStyle = strokeStyle ?? { ...TextElement.defaults.strokeStyle };

    this.fontFamily = fontFamily ?? TextElement.defaults.fontFamily;
    this.textAnchor = textAlign ?? TextElement.defaults.textAnchor;
    this.textAlign = textAlign ?? TextElement.defaults.textAlign;
    this.dominantBaseline = dominantBaseline ?? TextElement.defaults.dominantBaseline;

    this.shapeInside = shapeInside ?? TextElement.defaults.shapeInside;
    this.shapeMargin = shapeMargin ?? TextElement.defaults.shapeMargin;
    this.shapePadding = shapePadding ?? TextElement.defaults.shapePadding;
  }

  toSvgTag(): string {
    let s = `<text id="${this.id}" x="${this.x}" y="${this.y}" font-size="${this.fontSize}" font-family="${this.fontFamily}" text-anchor="${this.textAnchor}" dominant-baseline="${this.dominantBaseline}" `;
    s += ` fill="${this.fillStyle.color.getRGB8()}" stroke="${this.strokeStyle.color.getRGB8()}"`;
    s += ` fill-opacity="${this.fillStyle.color.getOpacity()}" stroke-opacity="${this.strokeStyle.color.getOpacity()}"`;
    s += ` stroke-width="${this.strokeStyle.width}"`

    s += ` style="`
    if (this.shapeInside.length != 0) {  // if not empty string
      s += ` shape-inside: ${this.shapeInside};`;
      s += ` shape-margin: ${this.shapeMargin}px;`
      s += ` shape-padding: ${this.shapePadding}px;`
    }
    s += ` text-align: ${this.textAlign};`
    s += `"`

    s += ' >\n';
    s += this.text + '\n';
    s += '</text>\n';
    return s;
  }
}

// https://www.w3.org/TR/SVG2/shapes.html#LineElement
export interface LineArgs {
  id?: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  fillStyle?: FillStyle;
  strokeStyle?: StrokeStyle;
}

export class Line implements SVGPrimitive {

  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;

  public static defaults = {
    fillStyle: FillStyle.getDefault(),
    strokeStyle: StrokeStyle.getDefault(),
  };

  constructor(args: LineArgs) {
    const {
      id,
      x1,
      y1,
      x2,
      y2,
      fillStyle,
      strokeStyle,
    } = {
      ...args
    };

    this.id = id ?? uuidv4();
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.fillStyle = fillStyle ?? { ...Line.defaults.fillStyle };
    this.strokeStyle = strokeStyle ?? { ...Line.defaults.strokeStyle };
  }

  toSvgTag(): string {
    let s = `<line id="${this.id}" x1="${this.x1}" y1="${this.y1}" x2="${this.x2}" y2="${this.y2}" `;
    s += ` stroke="${this.strokeStyle.color.getRGB8()}"`;
    s += ` stroke-opacity="${this.strokeStyle.color.getOpacity()}"`;
    s += ` stroke-width="${this.strokeStyle.width}"`
    s += ' />\n';
    return s;
  }
}

export interface PolylineArgs {
  id?: string;
  points: Point[];
  fillStyle?: FillStyle;
  strokeStyle?: StrokeStyle;
}

export class Polyline implements SVGPrimitive {

  id: string;
  points: Point[];
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;

  public static defaults = {
    fillStyle: FillStyle.getDefault(),
    strokeStyle: StrokeStyle.getDefault(),
  };

  constructor(args: PolylineArgs) {

    const {
      id,
      points,
      fillStyle,
      strokeStyle,
    } = {
      ...args
    };

    this.id = id ?? uuidv4();
    this.points = points;
    this.fillStyle = fillStyle ?? { ...Polyline.defaults.fillStyle };
    this.strokeStyle = strokeStyle ?? { ...Polyline.defaults.strokeStyle };
  }

  toSvgTag(): string {
    let pointsString = this.points.map((p: Point) => p.toString()).join(' ')

    let s = `<polyline id="${this.id}" points="${pointsString}" `;
    s += ` fill="${this.fillStyle.color.getRGB8()}" stroke="${this.strokeStyle.color.getRGB8()}"`;
    s += ` fill-opacity="${this.fillStyle.color.getOpacity()}" stroke-opacity="${this.strokeStyle.color.getOpacity()}"`;
    s += ` stroke-width="${this.strokeStyle.width}"`
    s += ' />\n';
    return s;
  }
}

// https://www.w3.org/TR/SVG2/shapes.html#PolygonElement
export interface PolygonArgs {
  id?: string;
  points: Point[];
  fillStyle?: FillStyle;
  strokeStyle?: StrokeStyle;
}

export class Polygon implements SVGPrimitive {

  id: string;
  points: Point[];
  fillStyle: FillStyle;
  strokeStyle: StrokeStyle;

  public static defaults = {
    fillStyle: FillStyle.getDefault(),
    strokeStyle: StrokeStyle.getDefault(),
  };

  constructor(args: PolygonArgs) {

    const {
      id,
      points,
      fillStyle,
      strokeStyle,
    } = {
      ...args
    };

    this.id = id ?? uuidv4();
    this.points = points;
    this.fillStyle = fillStyle ?? { ...Polygon.defaults.fillStyle };
    this.strokeStyle = strokeStyle ?? { ...Polygon.defaults.strokeStyle };
  }

  toSvgTag(): string {
    let pointsString = this.points.map((p: Point) => p.toString()).join(' ')

    let s = `<polygon id="${this.id}" points="${pointsString}" `;
    s += ` fill="${this.fillStyle.color.getRGB8()}" stroke="${this.strokeStyle.color.getRGB8()}"`;
    s += ` fill-opacity="${this.fillStyle.color.getOpacity()}" stroke-opacity="${this.strokeStyle.color.getOpacity()}"`;
    s += ` stroke-width="${this.strokeStyle.width}"`
    s += ' />\n';
    return s;
  }
}
