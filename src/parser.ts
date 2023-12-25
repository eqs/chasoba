import { show, accept, expect } from './utils';

export type ASTree = {
  root: TreeNode
};

export type TreeNode = TreeBranch | TreeLeaf;

export type TreeBranch = {
  left: TreeNode | undefined;
  op: string;
  right: TreeNode | undefined;
};

export type TreeLeaf = string;


export class Parser {

  tokens: string[]

  constructor(tokens: string[]) {
    this.tokens = [...tokens];
  }

  analyze(): ASTree {
    let ast = this.program();

    if (this.tokens.length > 0) {
      show('ast = ', ast);
      show('processed tokens = ', this.tokens);
    }

    if (ast !== undefined) {
      return { root: ast };
    } else {
      return { root: '' };
    }
  }

  program(): TreeNode | undefined {
    let left = this.statement();

    // If semicolon is found, it has possibilities that there are next statements.
    let op;
    while (op = accept(this.tokens, ';')) {
      // next statement
      let right = this.statement();
      // create node and assign to left (create hierarchy)
      left = { left, op, right };
    }

    return left;
  }

  statement(): TreeNode | undefined {
    return this.separation();
  }

  value(): TreeLeaf | undefined {
    if (this.tokens.length == 0) {
      return;
    }

    return this.tokens.shift();
  }

  assignment(): TreeNode | undefined {
    let left: TreeNode | undefined = this.expression();

    let op;
    while (op = accept(this.tokens, '=')) {
      let right = this.separation();
      left = { left, op, right };
    }

    return left;
  }

  separation(): TreeNode | undefined {
    let left = this.assignment();

    let op;
    while (op = accept(this.tokens, ',')) {
      let right = this.assignment();
      left = { left, op, right };
    }

    return left;
  }

  expression(): TreeNode | undefined {
    let left = this.mulexpression();

    let op;
    while (op = accept(this.tokens, '+', '-')) {
      let right = this.mulexpression();
      left = { left, op, right };
    }

    return left;
  }

  mulexpression(): TreeNode | undefined {
    let left = this.powexpression();

    let op;
    while (op = accept(this.tokens, '*', '/')) {
      let right = this.powexpression();
      left = { left, op, right };
    }

    return left;
  }

  powexpression(): TreeNode | undefined {
    let left = this.perpexpression();

    let op;
    while (op = accept(this.tokens, '**')) {
      let right = this.perpexpression();
      left = { left, op, right };
    }

    return left;
  }

  perpexpression(): TreeNode | undefined {
    let left = this.signexpression();

    let op;
    while (op = accept(this.tokens, '-|', '|-')) {
      let right = this.signexpression();
      left = { left, op, right };
    }

    return left;
  }

  signexpression(): TreeNode | undefined {
    // NOTE: No left term

    let op;
    while (op = accept(this.tokens, '+', '-')) {
      let right = this.assignment();

      if (op == '+') {
        return right;
      }

      // Replace minus operator to multiplication of zero minus one
      return {
        left: { left: '0', op: '-', right: '1' },
        op: '*',
        right
      };
    }

    return this.period();
  }

  period(): TreeNode | undefined {
    let left = this.funccall();

    let op;
    while (op = accept(this.tokens, '.')) {
      let right = this.funccall();
      left = { left, op, right };
    }

    return left;
  }

  funccall(): TreeNode | undefined {
    let left = this.paren();

    let op
    while (op = accept(this.tokens, '(')) {
      let right = this.separation();
      op += expect(this.tokens, ')');
      left = { left, op, right };
    }

    return left;
  }

  paren(): TreeNode | undefined {
    // No left term

    let op;
    while(op = accept(this.tokens, '(')) {
      // analyze inside parenses
      let right: any = this.separation();

      // Right paren
      op += expect(this.tokens, ')');

      if (right !== undefined && right.op == ',') {
        // If op is comma, the term should be vector
        return {
          left: 'vector',
          op: '()',
          right,
        };
      } else {
        // Reduce depth
        return right;
      }
    }

    return this.value();
  }
}
