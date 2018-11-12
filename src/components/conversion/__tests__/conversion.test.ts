import {initContainer} from '../../../framework/initContainer'
import {registerConverters} from '../converters'
import {container} from '../../../framework/globalContainer'
import {DefaultTo, Reverse, Sort} from '../annotations/converters'
import {ConvertedParameters} from '../annotations/ConvertedParameters'
import {Converter} from '../Converter'
import {ConversionServiceName} from '../../../framework/services'

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
