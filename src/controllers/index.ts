import { Controller } from './Controller'
import { PhpController } from './Php'

/**
 * Array of controller instances.
 */
export const CONTROLLERS: Controller[] = [
    new PhpController()
]
