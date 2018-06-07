import {Converter} from './Converter'
import {registerConverters} from './converters'
import {ConvertedParameters} from './annotations/ConvertedParameters'
import {Sorted} from './annotations/Sorted'
import {container} from '../framework/globalContainer'
import {ConversionServiceName} from '../framework/services'
import {initContainer} from '../framework/initContainer'

initContainer()
registerConverters(container.get<Converter>(ConversionServiceName.Converter))


class Test {
    @ConvertedParameters()
    foo(@Sorted() bar: number[]): void {
        console.log(bar)
    }
}

const test = new Test()
test.foo([3, 1, 5, 2])
