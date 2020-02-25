import { HttpServer } from '../server/HttpServer'

/**
 * Generic controller interface for all controllers.
 */
export interface Controller {

    /**
     * Method used to initialize an implementing class.
     *
     * @param httpServer A http server instance
     */
    initialize(httpServer: HttpServer): void;
}
