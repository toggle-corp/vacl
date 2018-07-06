import {
    validOperations,
    validOperators,
} from './validOperations';


export default class SemanticAnalyzer {
    constructor(ast) {
        this.ast = ast;
    }

    // Set the data types of variables
    // before analysing.
    setVariableTypes(variables) {
        this.variables = variables;
        return this;
    }

    analyze() {
        this.tree = this.analyzeNode(this.ast);
        this.tree = this.castNode(this.tree);
        return this;
    }

    getTree() {
        return this.tree;
    }

    analyzeNode = (astNode) => {
        // Check if the node is a valid operator, if so
        // do a complex analysis
        if (astNode.tokenType === 'keyword' &&
            validOperators.indexOf(astNode.value) >= 0) {
            return this.analyzeOperatorNode(astNode);
        }

        // If a constant, set the data type according
        // to token type
        if (astNode.tokenType === 'number' ||
            astNode.tokenType === 'string' ||
            astNode.tokenType === 'boolean') {
            return {
                nodeType: 'constant',
                dataType: astNode.tokenType,
                value: astNode.value,
            };
        }

        // If a variable, get the data type from the variableTypes
        // mapping provided.
        if (astNode.tokenType === 'variable') {
            const dataType = this.variables[astNode.value];

            if (!dataType) {
                throw new Error(`Unknown variable ${astNode.value}`); // TODO error position
            }

            return {
                dataType,
                value: astNode.value,
                nodeType: 'variable',
            };
        }

        // Default case: just analyse the children node.
        // Actually code should never reach here.
        return {
            ...astNode,
            children: astNode.children && astNode.children.map(this.analyzeNode),
        };
    }

    analyzeOperatorNode = (astNode) => {
        // For operator node, make sure that children data types
        // are supported by the operator.

        // List of operations supported by the operator.
        const operations = validOperations[astNode.value];

        const node = {};
        node.nodeType = 'operator';
        node.value = astNode.value;

        // First analyze the children nodes and get their data types.
        node.children = astNode.children.map(this.analyzeNode);
        const childrenTypes = node.children.map(child => child.dataType);

        // Next find an operator that fits the children data types.
        const operation = operations
            .find(op => this.checkTypes(op.children, childrenTypes));

        // If no matched operation found, this is an error.
        if (!operation) {
            throw new Error('Invalid types for operator'); // TODO details
        }

        // Now the dataType of an operator node is the dataType
        // of the result of the operation.
        node.dataType = operation.result;
        return node;
    }

    // Check if two list types are equal.
    checkTypes = (types1, types2) => {
        if (types1.length !== types2.length) {
            return false;
        }

        for (let i = 0; i <= types1.length; i += 1) {
            if (types2[i] !== types1[i]) {
                return false;
            }
        }
        return true;
    }

    castNode = (oldNode) => {
        const node = { ...oldNode };
        if (node.nodeType === 'constant') {
            if (node.dataType === 'number') {
                node.value = parseFloat(node.value);
            }
        }
        // TODO for variable, create a sub tree for cast function

        node.children = node.children && node.children.map(this.castNode);
        return node;
    }
}
