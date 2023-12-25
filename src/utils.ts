import * as fs from 'fs';
import * as util from 'util';

export interface Default {
  getDefault(): any;
}

export interface Attributes {
  getAttribute(attr: any): any;
}

export function read(filename: string): string {
  return fs.readFileSync(filename, 'utf-8');
}

export function show(msg: string, obj: any) {
  const o = util.inspect(obj, {
    showHidden: false,
    depth: null,
    maxArrayLength: null,
    colors: true,
  });

  console.log(msg + o);
}

export function error(...msgs: string[]) {
  console.log(msgs.join(''));
  process.exit();
}

// if tokens[0] is included cs, return it and execute shift()
// otherwise, not do anything
export function accept(tokens: string[], ...cs: string[]): string | undefined {
  // no tokens
  if (tokens.length == 0) {
    return;
  }

  if (cs.includes(tokens[0])) {
    return tokens.shift();
  }

  return;
}

// if tokens[0] is included cs, return it and execute shift()
// otherwise, raise error
export function expect(tokens: string[], ...cs: string[]): string | undefined {
  const t = accept(tokens, ...cs);

  if (t) {
    return t;
  }

  error('tokens[0] = "', tokens[0], '" is not included in cs = [', cs.join(', '), '].');
}
