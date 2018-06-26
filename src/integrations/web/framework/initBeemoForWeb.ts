import {initWebContainer} from './initWebContainer'
import {initBeemoCore} from '../../../framework'

export function initBeemoForWeb() {
    initBeemoCore()
    initWebContainer()
}