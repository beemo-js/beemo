import {Permission} from '../Permission'
import {aopAnnotation} from '../../annotations'
import {container, PermissionsServiceName} from '../../../framework'
import {PermissionsRequester} from '..'

/**
 * Annotated method requires given permission.
 * Methods using it should be asynchronous
 */
export function RequiresPermission(permission: Permission): MethodDecorator {
    return aopAnnotation(async (next, args) => {
        const accepted = await container.get<PermissionsRequester>(PermissionsServiceName.PermissionsRequester).request(permission)
        if (accepted) {
            return next(args)
        }

        throw 'Permission denied'
    })
}