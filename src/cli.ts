#!/usr/bin/env node
import { read, show } from './utils';
import { Chasoba } from './index';


function main() {
  const args = process.argv.slice(2);

  if (args.length == 0) {
    console.log('No input files.');
    process.exit(1);
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
