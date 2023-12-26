import { read, show } from './utils';
import { Lexer } from './lexer';
import { Parser } from './parser';
import { Runner } from './runner';


export class Chasoba {

  constructor() {}

  render(source: string, verbose: boolean = false): string {
    // Lexical analysis
    const lexer = new Lexer();
    const tokens = lexer.analyze(source);

    if (verbose) {
      show('tokens = ', tokens);
      console.log('='.repeat(80));
    }

    // Syntax analysis
    const parser = new Parser(tokens);
    const ast = parser.analyze();

    if (verbose) {
      show('ast = ', ast);
      console.log('='.repeat(80));
    }

    // Run AST
    const runner = new Runner();
    const svg = runner.run(ast);

    if (verbose) {
      console.log('='.repeat(80));
      show('global = ', runner.global);
      console.log('='.repeat(80));
    }

    return svg;
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length == 0) {
    console.log('No input files.');
    process.exit();
  }

  let verbose = false;
  if (args.length >= 1 && args[1] == '--verbose') {
    verbose = true;
  }

  const source = read(args[0]);

  const chasoba = new Chasoba();
  const svg = chasoba.render(source, verbose);

  console.log(svg);
}

main();
