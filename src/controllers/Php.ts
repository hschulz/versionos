import { Controller } from './Controller'
import { HttpServer } from '../server/HttpServer'
import { Request, Response } from 'restify'
import { phpService } from '../service/Php'
import { VersionList, VersionResponse } from 'src/Types'

/**
 *
 */
export class PhpController implements Controller {

    /**
     *
     * @param httpServer
     */
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/php/versions', this.list.bind(this))
        httpServer.get('/php/:version', this.getVersion.bind(this))
    }

    /**
     *
     * @param req
     * @param res
     */
    protected async list(req: Request, res: Response): Promise<void> {

        phpService.list()
            .then((versions: VersionList) => {
                res.send(200, versions)
            })
            .catch((error: Error) => {
                res.send(500, error.message)
            })
    }

    /**
     *
     * @param req
     * @param res
     */
    protected async getVersion(req: Request, res: Response): Promise<void> {

        phpService.getVersion(req.params.version)
            .then((version: VersionResponse) => {
                res.send(200, version);
            })
            .catch((error: Error) => {
                res.send(404, error.message)
            })
    }
}
