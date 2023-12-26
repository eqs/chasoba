import * as svg from '../svg';
import { Vector } from '../../math';

export abstract class Shape {
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
