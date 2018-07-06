export const unaryOperators = [
    'NOT',
    '-',
    '+',
];

// This is a list of list where
// the first list defines the precedence of the operators
// and the second list is the operators of same precedence.
export const binaryOperators = [
    ['OR'],
    ['AND'],

    ['<', '<=', '>', '>=', '==', '!='],

    ['+', '-'],
    ['*', '/'],
];
