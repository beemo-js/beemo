import {initContainer} from "./initContainer"
import {container} from "./globalContainer"
import {ConversionServiceName, ValidationServiceName} from "./services"
import {registerConverters} from '../components/conversion/converters'
import {Converter} from '../components/conversion/Converter'
import {registerValidators} from '../components/validation/validators'
import {Validator} from '../components/validation/Validator'

export function initBeemoCore() {
    initContainer()
    registerConverters(container.get<Converter>(ConversionServiceName.Converter))
    registerValidators(container.get<Validator>(ValidationServiceName.Validator))
}