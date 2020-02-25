import * as fs from 'fs'
import { VersionList, VersionResponse } from 'src/Types'

/**
 *
 */
class PhpService {

    /**
     *
     */
    protected static dataFile: string = './data/php.json'

    /**
     *
     */
    public async list(): Promise<VersionList> {

        return new Promise((resolve, reject) => {

            fs.readFile(PhpService.dataFile, { encoding: 'utf-8', flag: 'r' }, (err, data) => {

                if (err || data === undefined) {
                    return reject(new Error('Failed to open data json ' + PhpService.dataFile))
                }

                const json: VersionList = JSON.parse(data)

                return resolve(json)
            })
        })
    }

    /**
     *
     * @param version A semantic version string
     * @returns Promisified version data
     */
    public async getVersion(version: string): Promise<VersionResponse> {

        /** */
        return new Promise((resolve, reject) => {

            /** */
            fs.readFile(PhpService.dataFile, { encoding: 'utf-8', flag: 'r' }, (err, data) => {

                if (err || data === undefined) {
                    return reject(new Error('Failed to open data json ' + PhpService.dataFile))
                }

                const json: VersionList = JSON.parse(data)

                if (!json[version]) {
                    return reject(new Error('Version not found: ' + version))
                }

                json[version].identifier = version
                json[version].badgeUrl = 'https://img.shields.io/badge/php-' + version + '-black?style=flat-square'

                return resolve(json[version])
            })
        })
    }
}

export const phpService: PhpService = new PhpService()
