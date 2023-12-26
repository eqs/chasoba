import { SVGDocument, Group, TextElement } from './svg';
import { Shape } from './shapes';

export class Canvas {

  doc: SVGDocument
  shapes: Shape[]

  constructor() {
    this.doc = new SVGDocument(800, 800);
    this.shapes = []
  }

  setSize(w: number, h: number) {
    this.doc = new SVGDocument(w, h);
  }

  addShape(shape: Shape) {
    this.shapes.push(shape);
  }

  render(): string {
    // const elem = new TextElement(
    //   'Welcome to chasoba.js', 400.0, 400.0, 32.0
    // );
    let elements = this.shapes.map((s: Shape) => s.render());
    return this.doc.render(new Group({ elements }));
  }
}
