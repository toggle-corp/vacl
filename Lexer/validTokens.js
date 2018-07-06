export default [
    // {
    //     pattern: regex pattern to match
    //     tokenType: type of token
    //     value: value that represents this token,
    //            if not provided, the matched string is used by default
    // }
    {
        pattern: 'AND',
        tokenType: 'keyword',
    },
    {
        pattern: 'OR',
        tokenType: 'keyword',
    },
    {
        pattern: 'NOT',
        tokenType: 'keyword',
    },
    {
        pattern: '<=',
        tokenType: 'keyword',
    },
    {
        pattern: '>=',
        tokenType: 'keyword',
    },
    {
        pattern: '<',
        tokenType: 'keyword',
    },
    {
        pattern: '>',
        tokenType: 'keyword',
    },
    {
        pattern: '=',
        tokenType: 'keyword',
        value: '==',
    },
    {
        pattern: '!=',
        tokenType: 'keyword',
    },
    {
        pattern: '\\(',
        tokenType: 'keyword',
    },
    {
        pattern: '\\)',
        tokenType: 'keyword',
    },
    {
        pattern: '\\+',
        tokenType: 'keyword',
    },
    {
        pattern: '\\-',
        tokenType: 'keyword',
    },
    {
        pattern: '\\*',
        tokenType: 'keyword',
    },
    {
        pattern: '\\/',
        tokenType: 'keyword',
    },

    {
        pattern: 'False|True',
        tokenType: 'boolean',
    },
    {
        pattern: '[0-9]+',
        tokenType: 'number',
    },
    {
        // TODO: better string pattern
        pattern: '".*"',
        tokenType: 'string',
    },
    {
        pattern: '[a-zA-Z_][a-zA-Z0-9_]*',
        tokenType: 'variable',
    },
];
