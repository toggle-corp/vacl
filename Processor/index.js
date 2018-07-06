import operators from './operators';


export default class Processor {
    constructor(parseTree) {
        this.parseTree = parseTree;
    }

    setContext(context) {
        this.context = context;
        return this;
    }

    execute() {
        const resolvedTree = this.resolveNode(this.parseTree);
        this.result = this.executeNode(resolvedTree);
        return this;
    }

    getResult() {
        return this.result;
    }

    resolveNode = (node) => {
        if (node.nodeType === 'variable') {
            return {
                ...this.context[node.value],
                nodeType: 'constant',
            };
        }
        return {
            ...node,
            children: node.children && node.children.map(this.resolveNode),
        };
    }

    executeNode = (node) => {
        if (node.nodeType === 'constant') {
            return {
                value: node.value,
                dataType: node.dataType,
            };
        } else if (node.nodeType === 'operator') {
            const values = node.children && node.children.map(this.executeNode);
            return operators[node.value](values);
        }

        return {
            value: undefined,
            dataType: 'undefined', // TODO DONOT HARD CODE DATA TYPES
        };
    }
}
