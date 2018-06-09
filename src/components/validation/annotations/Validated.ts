import {addAnnotation} from './helpers'
import {container} from '../../../framework/globalContainer'
import {ReflectionClassTypesStore} from '../../types/ReflectionClassTypesStore'
import {TypesServiceName} from '../../../framework/services'

export function Validated(classFn?: Function): any {
    return (target: any, key: string, index?: number) => {
        const reflectionClassTypesStore = container.get<ReflectionClassTypesStore>(TypesServiceName.ReflectionClassTypesStore)

        classFn = classFn || (index === undefined ?
                reflectionClassTypesStore.getPropertyType(target.constructor, key):
                reflectionClassTypesStore.getMethodParameterType(target.constructor, key, index)
        )

        if (!classFn) {
            throw `@Validated annotation must be used on variable with known type.`
        }

        addAnnotation(target, key, index, {
            id: 'validated',
            args: {classFn}
        })
    }
}