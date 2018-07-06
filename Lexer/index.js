// Database of valid tokens
import validTokens from './validTokens';


export default class Lexer {
    constructor(script) {
        this.script = script;
        this.tokens = [];
    }

    getTokens() {
        return this.tokens;
    }

    tokenize() {
        this.position = 0;
        this.currentString = this.script;

        // Keep finding next token until no string is left.
        while (this.currentString.trim().length > 0) {
            this.tokens.push(this.findNextToken());
        }
        return this;
    }

    findNextToken() {
        let value;

        // Find the first valid token that matches the begining
        // of our string.
        const matchedToken = validTokens.find((validToken) => {
            // For matching any token pattern:
            // - Must be at the beginning of the string
            // - Can be surrounded by any number of whitespaces
            const regex = new RegExp(`^\\s*(${validToken.pattern})\\s*`);
            const match = regex.exec(this.currentString);

            // If match, get the matched string value.
            if (match) {
                [value] = match;
                return true;
            }
            return false;
        });

        const { position } = this;
        if (!matchedToken) {
            throw new Error(`Invalid token at position ${position}`);
        }

        // Update the string that remains to be tokenized
        // and the position of the next token.
        this.currentString = this.currentString.substr(value.length);
        this.position += value.length;

        return {
            position,
            value: matchedToken.value || value.trim(),
            tokenType: matchedToken.tokenType,
        };
    }
}
