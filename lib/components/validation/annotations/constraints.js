import { between, email, future, length, lengthBetween, max, maxLength, min, minLength, negative, negativeOrZero, notEmpty, notNull, past, pattern, positive, positiveOrZero, typed, url, valid } from '../builders';
import { container } from '../../../framework/globalContainer';
import { AnnotationsServiceName, TypesServiceName } from '../../../framework/services';
// Annotation to property or method
function addAnnotation(target, key, index, data) {
    const classAnnotationsStore = container.get(AnnotationsServiceName.ClassAnnotationsStore);
    if (index === undefined) {
        // property
        classAnnotationsStore.addPropertyAnnotation(target.constructor, key, Constraints, data);
    }
    else {
        // method parameter
        classAnnotationsStore.addMethodParameterAnnotation(target.constructor, key, index, Constraints, data);
    }
}
// Returns a validator annotation
export const Constraints = (data) => (target, key, index) => addAnnotation(target, key, index, data);
// Global
export const Typed = (type) => Constraints(typed(type));
export const NotNull = () => Constraints(notNull());
// Numbers
export const Min = (lowerBound) => Constraints(min(lowerBound));
export const Max = (upperBound) => Constraints(max(upperBound));
export const Between = (lowerBound, upperBound) => Constraints(between(lowerBound, upperBound));
export const Positive = () => Constraints(positive());
export const PositiveOrZero = () => Constraints(positiveOrZero());
export const Negative = () => Constraints(negative());
export const NegativeOrZero = () => Constraints(negativeOrZero());
// Strings
export const Pattern = (p) => Constraints(pattern(p));
export const Email = () => Constraints(email());
export const Url = () => Constraints(url());
// Arrays
export const NotEmpty = () => Constraints(notEmpty());
export const Length = (l) => Constraints(length(l));
export const MinLength = (length) => Constraints(minLength(length));
export const MaxLength = (length) => Constraints(maxLength(length));
export const LengthBetween = (minLength, maxLength) => Constraints(lengthBetween(minLength, maxLength));
// Dates
export const Past = (from) => Constraints(past(from));
export const Future = (from) => Constraints(future(from));
// Classes
export const Valid = (classFn) => (target, key, index) => {
    const reflectionClassTypesStore = container.get(TypesServiceName.ReflectionClassTypesStore);
    classFn = classFn || (index === undefined ?
        reflectionClassTypesStore.getPropertyType(target.constructor, key) :
        reflectionClassTypesStore.getMethodParameterType(target.constructor, key, index));
    if (!classFn) {
        throw `@Validated annotation must be used on variable with known type.`;
    }
    addAnnotation(target, key, index, valid(classFn));
};
