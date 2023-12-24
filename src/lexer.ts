export class Lexer {

  pattern: RegExp;

  constructor() {
    // Remove comments: \/\/.*$
    // Real number: \d+\.\d+
    // Integer: \d+
    // String: ".*?"
    // Function name: \w+
    // Spaces: \s
    // Power operator: \*\*
    // others (semicolon, parenses, ...): .
    this.pattern = /\/\/.*$|(\d+\.\d+|\d+|".*?"|\w+)|\s|(\*\*)|(.)|/m;
  }

  analyze(source: string): string[] {
    let tokens = source.split(this.pattern);

    // remove redundant elements (undefined, '', ...)
    tokens = tokens.filter(a => a);

    return tokens;
  }
}
