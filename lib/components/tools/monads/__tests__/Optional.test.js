import { Optional } from '../Optional';
test('Optional should use given value if not null', () => {
    expect(Optional.of('hello')
        .map(val => val.toUpperCase())
        .getOrDefault('hola')).toBe('HELLO');
});
test('Optional should use default value if given value is null', () => {
    expect(Optional.of(null)
        .map(val => val.toUpperCase())
        .getOrDefault('HOLA')).toBe('HOLA');
});
