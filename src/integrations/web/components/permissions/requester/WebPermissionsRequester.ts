import {Permission, PermissionsRequester} from '../../../../../components/permissions'

export class WebPermissionsRequester implements PermissionsRequester {
    request(permission: Permission): Promise<boolean> {
        switch (permission) {
            case Permission.NOTIFICATIONS:
                return this.requestNotificationsPermission()
            default:
                throw `Permission ${permission} is not handled.`
        }
    }

    private async requestNotificationsPermission(): Promise<boolean> {
        const permission = await Notification.requestPermission()
        return ['denied', 'default'].indexOf(permission) === -1
    }
}