import { show, error } from './utils';
import { ASTree } from './parser';
import { Vector } from './math';

export class Runner {

  global: any[]

  constructor() {
    this.global = []
  }

  run(ast: ASTree) {
    this.runNode(ast.root);
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
      } else {
        return left + right;
      }
    } else if (a.op == '-') {
      const left = this.runNode(a.left);
      const right = this.runNode(a.right);
      if (left instanceof Vector && right instanceof Vector) {
        return left.add(right);
      } else {
        return left - right;
      }
    } else if (a.op == '*') {
      const left = this.runNode(a.left);
      const right = this.runNode(a.right);
      if (left instanceof Vector && right instanceof Vector) {
        return left.dot(right);
      } else if (!(left instanceof Vector) && right instanceof Vector) {
        return right.mul(left);
      } else if (left instanceof Vector && !(right instanceof Vector)) {
        return left.mul(right);
      } else {
        return left * right;
      }
    } else if (a.op == '/') {
      const left = this.runNode(a.left);
      const right = this.runNode(a.right);
      if (left instanceof Vector && !(right instanceof Vector)) {
        return left.div(right);
      } else {
        return left / right;
      }
    } else if (a.op == '**') {
      const left = this.runNode(a.left);
      const right = this.runNode(a.right);
      return Math.pow(left, right);
    } else if (a.op == '-|') {
      const left = this.runNode(a.left);
      const right = this.runNode(a.right);
      return left.perpXY(right);
    } else if (a.op == '|-') {
      const left = this.runNode(a.left);
      const right = this.runNode(a.right);
      return left.perpYX(right);
    } else if (a.op == '=') {
      const left = this.runNode(a.left);
      const right = this.runNode(a.right);
      this.global[left] = right;
      return right;
    } else if (a.op == '()') {
      const func = this.runNode(a.left);
      const args = this.runNode(a.right);
      return this.runFunction(func, args);
    } else {
      error('ERROR: Unknown operator op = ', a.op);
    }
  }

  runFunction(func: string, args: any) {
    if (func == 'print') {
      // 引数配列を連結する
      const msg = args.flat().map((x: any) => `${x}`).join('');
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
    } else {
      error('ERROR: Unknown function func = ', func);
    }
  }
}
