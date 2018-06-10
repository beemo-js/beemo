import {Converter} from '../Converter'
import {registerConverters} from '../converters'
import {ConvertedParameters} from '../annotations/ConvertedParameters'
import {Sorted} from '../annotations/Sorted'
import {container} from '../../../framework/globalContainer'
import {ConversionServiceName} from '../../../framework/services'
import {initContainer} from '../../../framework/initContainer'

initContainer()
registerConverters(container.get<Converter>(ConversionServiceName.Converter))


test('ConvertedParameters', () => {
    class Test {
        @ConvertedParameters()
        foo(@Sorted() bar: number[]): number[] {
            return bar
        }
    }

    const test = new Test()
    expect(test.foo([3, 1, 5, 2])).toEqual([1,2,3,5])
})