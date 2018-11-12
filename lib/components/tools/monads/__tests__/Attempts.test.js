import { Attempt } from '../Attempt';
test('Attempt should use given value if no exception was thrown', () => {
    expect(Attempt.of(() => 'ok')
        .map(val => val.toUpperCase())
        .getOrDefault('not ok')).toBe('OK');
});
test('Attempt should use default value if an exception was thrown', () => {
    expect(Attempt.of(() => { throw 'blablabla'; })
        .map(val => val.toUpperCase())
        .getOrDefault('NOT OK')).toBe('NOT OK');
});
