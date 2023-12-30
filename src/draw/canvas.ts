import * as svg from './svg';
import { Shape } from './shapes';

export interface DrawingContextArgs {
  fillStyle?: svg.FillStyle;
  strokeStyle?: svg.StrokeStyle;
}

export class DrawingContext {

  fillStyle: svg.FillStyle;
  strokeStyle: svg.StrokeStyle;

  constructor(args: DrawingContextArgs) {
    const {
      fillStyle,
      strokeStyle,
    } = {
      ...args
    };
    this.fillStyle = fillStyle ?? svg.FillStyle.getDefault();
    this.strokeStyle = strokeStyle ?? svg.StrokeStyle.getDefault();
  }

  clone(): DrawingContext {
    return new DrawingContext({
      fillStyle: { ...this.fillStyle },
      strokeStyle: { ...this.strokeStyle },
    });
  }
}

export class Canvas {

  doc: svg.SVGDocument
  components: any[]

  constructor() {
    this.doc = new svg.SVGDocument(800, 800);
    this.components = []
  }

  setSize(w: number, h: number) {
    this.doc = new svg.SVGDocument(w, h);
  }

  addComponent(component: any) {
    this.components.push(component);
  }

  render(): string {

    let ctx = new DrawingContext({});

    let elements: svg.SVGPrimitive[] = []
    for (let k = 0; k < this.components.length; k++) {
      const component = this.components[k];
      if (component instanceof Shape) {
        elements.push(component.render(ctx.fillStyle, ctx.strokeStyle));
      } else if (component instanceof DrawingContext) {
        ctx = component;
      }
    }

    return this.doc.render(new svg.Group({ elements }));
  }
}
