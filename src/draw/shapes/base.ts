import * as svg from '../svg';
import { Vector } from '../../math';
import { v4 as uuidv4 } from 'uuid';


export abstract class Shape {

  id: string;

  constructor() {
    this.id = uuidv4();
  }

  abstract render(): svg.SVGPrimitive;
}

export interface HasAnchor {
  center(): Vector;
  north(): Vector;
  east(): Vector;
  west(): Vector;
  south(): Vector;
  direction(dir: number): Vector;
}

export interface HasLineAnchor {
  start(): Vector;
  end(): Vector;
  internalDivision(t: number): Vector;
}
