import { HttpServer } from './HttpServer'
import { RequestHandler, Server } from 'restify'
import * as restify from 'restify'
import { CONTROLLERS } from '../controllers/index'

/**
 *
 */
export class ApiServer implements HttpServer {

    /**
     * The actual server instance.
     */
    private restify: Server

    /**
     *
     */
    public constructor() {
        this.restify = restify.createServer()
        this.restify.use(restify.plugins.queryParser())
        this.restify.use(restify.plugins.bodyParser())

        this.restify.use((req, res, next) => {
            res.header('Accept', 'application/json')
            res.header('Content-Type', 'application/json')
            next()
        })

        this.addControllers()
    }

    /**
     *
     * @param url
     * @param requestHandler
     */
    public get(url: string, requestHandler: RequestHandler): void {
        this.addRoute('get', url, requestHandler)
    }

    /**
     *
     * @param url
     * @param requestHandler
     */
    public post(url: string, requestHandler: RequestHandler): void {
        this.addRoute('post', url, requestHandler)
    }

    /**
     *
     * @param url
     * @param requestHandler
     */
    public del(url: string, requestHandler: RequestHandler): void {
        this.addRoute('del', url, requestHandler)
    }

    /**
     *
     * @param url
     * @param requestHandler
     */
    public put(url: string, requestHandler: RequestHandler): void {
        this.addRoute('put', url, requestHandler)
    }

    /**
     *
     * @param method
     * @param url
     * @param requestHandler
     */
    protected addRoute(method: 'get' | 'post' | 'put' | 'del', url: string, requestHandler: RequestHandler): void {

        this.restify[method](url, async (req, res, next) => {
            try {
                await requestHandler(req, res, next)
            } catch (e) {
                console.log(e)
                res.send(500, e)
            }
        })

        console.log(`Added route ${method.toUpperCase()} ${url}`);
    }

    /**
     *
     * @param port
     */
    public start(port: number): void {
        this.restify.listen(port, () => console.log(`Server is up & running on port ${port}`))
    }

    /**
     *
     */
    protected addControllers(): void {
        CONTROLLERS.forEach(controller => controller.initialize(this))
    }
}
