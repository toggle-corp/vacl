import {
    unaryOperators,
    binaryOperators,
} from './operators';

export default class Parser {
    constructor(tokens) {
        this.tokens = tokens;
    }

    parse() {
        // First, generate a list of symbols.
        //
        // A symbol is a string that defines the type of the token
        // and is useful for parsing.
        // For keywords, it's the actual value of the keyword
        // and for the rest, it's the type of the token.
        this.symbols = this.tokens.map(t => (
            t.tokenType === 'keyword' ? t.value : t.tokenType
        ));

        // AST: Abstract sytnax tree
        // This is a simple parse tree.
        // A more useful tree is later generated by Sematic Analyzer.
        this.parseIndex = 0;

        // The AST is basically the whole expression tree.
        this.ast = this.fetchExpression();

        // If tokens remain to be parsed, it's an unexpected token.
        if (this.parseIndex !== this.tokens.length) {
            throw new Error(`Unexpected token at ${this.getNextPosition()}`);
        }
        return this;
    }

    getAst() {
        return this.ast;
    }

    // Fetch next symbol: set the values of currentSymbol and currentToken
    // and increase parseIndex for next time.
    fetchNextSymbol() {
        this.currentSymbol = this.symbols[this.parseIndex];
        this.currentToken = this.tokens[this.parseIndex];
        this.parseIndex += 1;
    }

    // Get the position of next token.
    // Useful for generating error messages.
    getNextPosition() {
        const token = this.tokens[this.parseIndex];
        if (token) {
            return token.position;
        }
        const lastToken = this.tokens[this.tokens.length - 1];
        return lastToken.position + lastToken.value.length + 1;
    }

    // Check if the next token is a particular symbol.
    // If so fetch that symbol and return true for parsing.
    // Else ignore and return false.
    accept(symbol) {
        if (this.symbols[this.parseIndex] === symbol) {
            this.fetchNextSymbol();
            return true;
        }
        return false;
    }

    // Similar to `accept(symbol)`, except if the next symbol is not
    // expected symbol, it throws an error.
    expect(symbol) {
        if (this.accept(symbol)) {
            return true;
        }
        const position = this.getNextPosition();
        throw new Error(`Expected "${symbol}" at ${position}`);
    }

    // Accept one of the given symbols.
    // See `accept(symbol)` for more info.
    acceptMultiple(symbols) {
        const found = symbols && symbols.find(symbol => this.accept(symbol));
        if (found) {
            return true;
        }
        return false;
    }

    // Expect next token to be one of the given symbols.
    // See `except(symbol)` for more info.
    expectMultiple(symbols) {
        const found = this.acceptMultiple(symbols);
        if (found) {
            return true;
        }
        const position = this.getNextPosition();
        throw new Error(`Expected one of "${symbols.join(',')}" at ${position}`);
    }

    // Fetch a value.
    // A value is one of the following:
    // - constant
    // - variable
    // - parantheses inside which is an expression
    // - an unary operator folloed by a value
    fetchValue() {
        const unaryFound = this.acceptMultiple(unaryOperators);
        if (unaryFound) {
            const unary = this.currentToken;
            const value = this.fetchValue();
            return {
                ...unary,
                children: [value],
            };
        }

        if (this.accept('(')) {
            const expression = this.fetchExpression();
            this.expect(')');
            return expression;
        }

        const symbols = ['number', 'string', 'boolean', 'variable'];
        this.expectMultiple(symbols);
        return { ...this.currentToken };
    }

    // Fetch an expression
    // A expression of order N, written as E(N) is terms combined
    // by binary operator of order N, written as O(N),
    // and can be one of the following:
    // - E(N-1)
    // - E(N-1) O(N) E(N-1)
    // where operator with highest N has highest precedence.
    // For the largest N, E(N) is a value. See fetchValue
    fetchExpression(order = 0) {
        // If we are at max precedence, get the value
        if (order === binaryOperators.length) {
            return this.fetchValue();
        }

        // Else first get the left expression
        let expression = this.fetchExpression(order + 1);

        const operators = binaryOperators[order];
        let binaryFound = this.acceptMultiple(operators);

        // And if there are binary operators,
        // keep getting the right expressions and form the
        // parse tree bottom-up.
        while (binaryFound) {
            const operator = this.currentToken;
            const left = expression;
            const right = this.fetchExpression(order + 1);

            expression = {
                ...operator,
                children: [left, right],
            };

            binaryFound = this.acceptMultiple(operators);
        }

        return expression;
    }
}
