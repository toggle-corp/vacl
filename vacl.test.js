import Lexer from './Lexer';
import Parser from './Parser';
import SemanticAnalyzer from './SemanticAnalyzer';
import Processor from './Processor';

test('compiles properly', () => {
    const lexer = new Lexer('2+3 >= 5 AND -6-7 = -13');
    const parser = new Parser(lexer.tokenize().getTokens());
    const sa = new SemanticAnalyzer(parser.parse().getAst());
    const processor = new Processor(sa.analyze().getTree());
    const result = processor.execute().getResult();
    expect(result).toEqual({
        value: true,
        dataType: 'boolean',
    });
});
