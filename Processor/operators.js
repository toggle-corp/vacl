export default {
    AND: values => ({
        value: values[0].value && values[1].value,
        dataType: 'boolean',
    }),
    OR: values => ({
        value: values[0].value || values[1].value,
        dataType: 'boolean',
    }),
    NOT: values => ({
        value: !values[0].value,
        dataType: 'boolean',
    }),
    '<': values => ({
        value: values[0].value < values[1].value,
        dataType: 'boolean',
    }),
    '>': values => ({
        value: values[0].value > values[1].value,
        dataType: 'boolean',
    }),
    '<=': values => ({
        value: values[0].value <= values[1].value,
        dataType: 'boolean',
    }),
    '>=': values => ({
        value: values[0].value >= values[1].value,
        dataType: 'boolean',
    }),
    '==': values => ({
        value: values[0].value === values[1].value,
        dataType: 'boolean',
    }),
    '!=': values => ({
        value: values[0].value !== values[1].value,
        dataType: 'boolean',
    }),
    '+': values => ({
        value: (values.length === 1) ? values[0].value : values[0].value + values[1].value,
        dataType: 'number',
    }),
    '-': values => ({
        value: (values.length === 1) ? -values[0].value : values[0].value - values[1].value,
        dataType: 'number',
    }),
    '*': values => ({
        value: values[0].value * values[1].value,
        dataType: 'number',
    }),
    '/': values => ({
        value: values[0].value / values[1].value,
        dataType: 'number',
    }),
};
