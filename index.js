import Lexer from './Lexer';
import Parser from './Parser';
import SemanticAnalyzer from './SemanticAnalyzer';
import Processor from './Processor';


export const compile = (script, variableTypes = {}) => {
    const tokens = new Lexer(script)
        .tokenize()
        .getTokens();

    const ast = new Parser(tokens)
        .parse()
        .getAst();

    return new SemanticAnalyzer(ast)
        .setVariableTypes(variableTypes)
        .analyze()
        .getTree();
};

export const run = (tree, context = {}) => (
    new Processor(tree)
        .setContext(context)
        .execute()
        .getResult()
);
