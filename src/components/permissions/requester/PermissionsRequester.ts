import {Permission} from '../Permission'

export interface PermissionsRequester {
    request(permission: Permission): Promise<boolean>
}