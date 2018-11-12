import { initContainer } from "./initContainer";
import { container } from "./globalContainer";
import { ConversionServiceName, ValidationServiceName } from "./services";
import { registerConverters } from '../components/conversion/converters';
import { registerValidators } from '../components/validation/validators';
export function initBeemoCore() {
    initContainer();
    registerConverters(container.get(ConversionServiceName.Converter));
    registerValidators(container.get(ValidationServiceName.Validator));
}
