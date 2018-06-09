import {Pipe} from '../Pipe'

test('Optional should use given value if not null', () => {
    expect(
        Pipe.of('pipe')
            .map(val => val.toUpperCase())
            .get()
    ).toBe('PIPE')
})
