import {Converter, registerConverters, ConvertedParameters, DefaultTo, Reverse, Sort} from '..'
import {container, ConversionServiceName, initContainer} from '../../../framework'

initContainer()
registerConverters(container.get<Converter>(ConversionServiceName.Converter))


test('ConvertedParameters', () => {
    class Test {
        @ConvertedParameters()
        foo(@DefaultTo([1,2]) @Sort() @Reverse() bar: number[]): number[] {
            return bar
        }
    }

    const test = new Test()
    expect(test.foo([3, 1, 5, 2])).toEqual([5,3,2,1])
    expect(test.foo(null)).toEqual([2,1])
})
