import {initContainer} from "./initContainer"
import {Converter, registerConverters} from "../components/conversion"
import {container} from "./globalContainer"
import {ConversionServiceName, ValidationServiceName} from "./services"
import {registerValidators, Validator} from "../components/validation"

export function initBeemoCore() {
    initContainer()
    registerConverters(container.get<Converter>(ConversionServiceName.Converter))
    registerValidators(container.get<Validator>(ValidationServiceName.Validator))
}