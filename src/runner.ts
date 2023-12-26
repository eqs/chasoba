import { show, error } from './utils';
import { ASTree } from './parser';
import { Vector } from './math';
import { Canvas } from './draw/canvas';
import {
  Rectangle,
  Circle,
  TextBox,
  Line,
} from './draw/shapes';

export class Runner {

  global: any[]
  canvas: Canvas;

  constructor() {
    this.global = []
    this.canvas = new Canvas();
  }

  run(ast: ASTree): string {
    this.runNode(ast.root);
    return this.canvas.render()
  }

  runNode(a: any): any {
    if (a === undefined) {
      return;
    }

    if (!a.op) {
      if (a[0] == '"') {
        return a.substr(1, a.length-2);
      } else if (/\d/.test(a[0])) {
        return Number(a);
      } else if (this.global.hasOwnProperty(a)) {
        return this.global[a];
      } else {
        return a;
      }
    } else if (a.op == ';') {
      this.runNode(a.left);
      this.runNode(a.right);
    } else if (a.op == ',') {
      return [this.runNode(a.left), this.runNode(a.right)].flat();
    } else if (a.op == '+') {
      const left = this.runNode(a.left);
      const right = this.runNode(a.right);
      if (left instanceof Vector && right instanceof Vector) {
        return left.add(right);
      } else if (typeof left == 'number' && typeof right == 'number') {
        return left + right;
      } else {
        error(`ERROR: Unsupported operand types for ${a.op}: '${left}' and '${right}'`);
      }
    } else if (a.op == '-') {
      const left = this.runNode(a.left);
      const right = this.runNode(a.right);
      if (left instanceof Vector && right instanceof Vector) {
        return left.sub(right);
      } else if (typeof left == 'number' && typeof right == 'number') {
        return left - right;
      } else {
        error(`ERROR: Unsupported operand types for ${a.op}: '${left}' and '${right}'`);
      }
    } else if (a.op == '*') {
      const left = this.runNode(a.left);
      const right = this.runNode(a.right);
      if (left instanceof Vector && right instanceof Vector) {
        return left.dot(right);
      } else if (typeof left == 'number' && right instanceof Vector) {
        return right.mul(left);
      } else if (left instanceof Vector && typeof right == 'number') {
        return left.mul(right);
      } else if (typeof left == 'number' && typeof right == 'number') {
        return left * right;
      } else {
        error(`ERROR: Unsupported operand types for ${a.op}: '${left}' and '${right}'`);
      }
    } else if (a.op == '/') {
      const left = this.runNode(a.left);
      const right = this.runNode(a.right);
      if (left instanceof Vector && !(right instanceof Vector)) {
        return left.div(right);
      } else if (typeof left == 'number' && typeof right == 'number') {
        return left / right;
      } else {
        error(`ERROR: Unsupported operand types for ${a.op}: '${left}' and '${right}'`);
      }
    } else if (a.op == '**') {
      const left = this.runNode(a.left);
      const right = this.runNode(a.right);
      if (typeof left == 'number' && typeof right == 'number') {
        return Math.pow(left, right);
      } else {
        error(`ERROR: Unsupported operand types for ${a.op}: '${left}' and '${right}'`);
      }
    } else if (a.op == '-|') {
      const left = this.runNode(a.left);
      const right = this.runNode(a.right);
      if (left instanceof Vector && right instanceof Vector) {
        return left.perpXY(right);
      } else {
        error(`ERROR: Unsupported operand types for ${a.op}: '${left}' and '${right}'`);
      }
    } else if (a.op == '|-') {
      const left = this.runNode(a.left);
      const right = this.runNode(a.right);
      if (left instanceof Vector && right instanceof Vector) {
        return left.perpYX(right);
      } else {
        error(`ERROR: Unsupported operand types for ${a.op}: '${left}' and '${right}'`);
      }
    } else if (a.op == '=') {
      const left = this.runNode(a.left);
      const right = this.runNode(a.right);
      this.global[left] = right;
      return right;
    } else if (a.op == '()') {
      const func = this.runNode(a.left);
      const args = this.runNode(a.right);
      return this.runFunction(func, args);
    } else if (a.op == '.') {
      const v = this.runNode(a.left);
      const attr = this.runNode(a.right);
      if (typeof v.getAttribute == 'function') {
        return v.getAttribute(attr);
      } else {
        error(`ERROR: value ${v} does not support getAttribute.`);
      }
    } else {
      error('ERROR: Unknown operator op = ', a.op);
    }
  }

  runFunction(func: string, args: any) {
    if (func == 'print') {
      // 引数配列を連結する
      const msg = [args].flat().map((x: any) => `${x}`).join('');
      console.log(msg);
    } else if (func == 'sin') {
      return Math.sin(args);
    } else if (func == 'cos') {
      return Math.cos(args);
    } else if (func == 'tan') {
      return Math.tan(args);
    } else if (func == 'exp') {
      return Math.exp(args);
    } else if (func == 'sqrt') {
      return Math.sqrt(args);
    } else if (func == 'log') {
      return Math.log(args);
    } else if (func == 'vector') {
      return new Vector(args[0], args[1]);
    } else if (func == 'mag') {
      return args.mag();
    } else if (func == 'normal') {
      return args.normal();
    } else if (func == 'angle') {
      return args.angle();
    } else if (func == 'get_x') {
      return args.getX();
    } else if (func == 'get_y') {
      return args.getY();
    } else if (func == 'draw') {
      this.canvas.addShape(args);
      return args;
    } else if (func == 'rect') {
      let rect = new Rectangle({
        x: args[0],
        y: args[1],
        width: args[2],
        height: args[3]
      });
      return rect;
    } else if (func == 'circle') {
      let circle = new Circle({
        cx: args[0],
        cy: args[1],
        r: args[2],
      });
      return circle;
    } else if (func == 'text') {
      let textbox = new TextBox({
        text: args[0],
        x: args[1],
        y: args[2],
      });
      return textbox;
    } else if (func == 'line') {
      let line = new Line({
        x1: args[0],
        y1: args[1],
        x2: args[2],
        y2: args[3],
      });
      return line;
    } else {
      error('ERROR: Unknown function func = ', func);
    }
  }
}
