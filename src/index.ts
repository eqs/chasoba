import { read, show } from './utils';
import { Lexer } from './lexer';
import { Parser } from './parser';
import { Runner } from './runner';


const args = process.argv.slice(2);

if (args.length == 0) {
  console.log('No input files.');
  process.exit();
}

const source = read(args[0]);

// Lexical analysis
const lexer = new Lexer();
const tokens = lexer.analyze(source);

show('tokens = ', tokens);
console.log('=============================================================================================')

// Syntax analysis
const parser = new Parser(tokens);
const ast = parser.analyze();

show('ast = ', ast);
console.log('=============================================================================================')

// Run AST
const runner = new Runner();
const svg = runner.run(ast);

console.log('=============================================================================================')
show('global = ', runner.global);

console.log('=============================================================================================')
console.log(svg);
