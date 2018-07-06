import { compile, run } from '.';

test('compiles properly', () => {
    const script = '2+foo >= 5 AND -6-bar = -13';

    const tree = compile(script, {
        foo: 'number',
        bar: 'number',
    });

    const result1 = run(tree, {
        foo: 3,
        bar: 7,
    });

    const result2 = run(tree, {
        foo: 2,
        bar: 7,
    });

    expect(result1).toEqual({
        value: true,
        dataType: 'boolean',
    });

    expect(result2).toEqual({
        value: false,
        dataType: 'boolean',
    });
});
