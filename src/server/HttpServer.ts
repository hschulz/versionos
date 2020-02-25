import { RequestHandler } from 'restify'

/**
 *
 */
export interface HttpServer {

    /**
     *
     * @param url
     * @param requestHandler
     */
    get(url: string, requestHandler: RequestHandler): void

    /**
     *
     * @param url
     * @param requestHandler
     */
    post(url: string, requestHandler: RequestHandler): void

    /**
     *
     * @param url
     * @param requestHandler
     */
    del(url: string, requestHandler: RequestHandler): void

    /**
     *
     * @param url
     * @param requestHandler
     */
    put(url: string, requestHandler: RequestHandler): void
}
