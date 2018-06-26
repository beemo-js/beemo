import {Permission} from '../Permission'

/**
 * Asks the user for a permission (e.g. notifications).
 */
export interface PermissionsRequester {
    request(permission: Permission): Promise<boolean>
}