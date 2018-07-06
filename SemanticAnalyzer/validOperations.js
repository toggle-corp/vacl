const NUM_COMP = {
    children: ['number', 'number'],
    result: 'boolean',
};
const STRING_COMP = {
    children: ['string', 'string'],
    result: 'boolean',
};
const BOOL_COMP = {
    children: ['boolean', 'boolean'],
    result: 'boolean',
};
const BOOL_IDENTITY = {
    children: ['boolean'],
    result: 'boolean',
};
const NUM_CALC = {
    children: ['number', 'number'],
    result: 'number',
};
const NUM_UNARY_CALC = {
    children: ['number'],
    result: 'number',
};

// Mapping of operators and their valid operations
// Each operation is defined by the list of children types
// and the type of the result.
export const validOperations = {
    NOT: [BOOL_IDENTITY],
    AND: [BOOL_COMP],
    OR: [BOOL_COMP],
    '<': [NUM_COMP],
    '<=': [NUM_COMP],
    '>': [NUM_COMP],
    '>=': [NUM_COMP],
    '==': [NUM_COMP, STRING_COMP, BOOL_COMP],
    '!=': [NUM_COMP, STRING_COMP, BOOL_COMP],
    '+': [NUM_CALC, NUM_UNARY_CALC],
    '-': [NUM_CALC, NUM_UNARY_CALC],
    '*': [NUM_CALC],
    '/': [NUM_CALC],
};

export const validOperators = Object.keys(validOperations);
