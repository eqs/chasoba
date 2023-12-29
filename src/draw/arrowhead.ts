export interface ArrowHeadArgs {
  headSize?: number;
}

export interface ArrowHead {
  id: string;
  headSize?: number;
  render(): string;
}

export class LatexHead implements ArrowHead {

  id: string;
  headSize?: number;

  constructor(args: ArrowHeadArgs) {
    const {
      headSize,
    } = {
      ...args
    };

    this.headSize = headSize ?? 8;
    this.id = `arrow-latex`;
  }

  render(): string {
    let s = `<marker id="${this.id}"
viewBox="0 0 32 32"
refX="0"
refY="16"
markerWidth="${this.headSize}"
markerHeight="${this.headSize}"
orient="auto-start-reverse">\n`;
    s += `<path d="M 0 0 L 0 32 L 32 16 z" />\n`
    s += `</marker>\n`;

    return s;
  }
}

export class CircleHead implements ArrowHead {

  id: string;
  headSize?: number;

  constructor(args: ArrowHeadArgs) {
    const {
      headSize,
    } = {
      ...args
    };

    this.headSize = headSize ?? 12;
    this.id = `arrow-circle`;
  }

  render(): string {
    let s = `<marker id="${this.id}"
viewBox="0 0 32 32"
refX="0"
refY="${this.headSize}"
markerWidth="${this.headSize}"
markerHeight="${this.headSize}"
orient="auto-start-reverse">\n`;
    s += `<circle cx="${this.headSize}" cy="${this.headSize}" r="${this.headSize}" stroke="none" fill="black" />\n`
    s += `</marker>\n`;

    return s;
  }
}
