import { container } from '../../../framework/globalContainer';
import { AnnotationsServiceName, TypesServiceName } from '../../../framework/services';
// Returns a validator annotation (parameter or property decorator)
function typeAnnotation(type) {
    return (target, key, index) => {
        const classAnnotationsStore = container.get(AnnotationsServiceName.ClassAnnotationsStore);
        const classTypesStore = container.get(TypesServiceName.ClassTypesStore);
        if (index === undefined) {
            // property
            classAnnotationsStore.addPropertyAnnotation(target.constructor, key, Type, { type });
            classTypesStore.setPropertyType(target.constructor, key, type);
        }
        else {
            // method parameter
            classAnnotationsStore.addMethodParameterAnnotation(target.constructor, key, index, Type, { type });
            classTypesStore.setMethodParameterType(target.constructor, key, index, type);
        }
    };
}
export const Type = (type) => typeAnnotation(type);
export function ReturnType(type) {
    return (target, key, decorator) => {
        const classAnnotationsStore = container.get(AnnotationsServiceName.ClassAnnotationsStore);
        const classTypesStore = container.get(TypesServiceName.ClassTypesStore);
        classAnnotationsStore.addMethodAnnotation(target.constructor, key, ReturnType, { type });
        classTypesStore.setMethodReturnType(target.constructor, key, type);
    };
}
