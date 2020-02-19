import * as fs from 'fs'

/**
 *
 */
const file: string = './data/php.json'

/**
 * The lifetime states a version can have.
 */
export enum VersionState {

    /**
     * This versions state is unknown.
     */
    UNKNOWN = 'UNKNOWN',

    /**
     * This version is currently alive and well and receives long term support.
     */
    ACTIVE_LTS = 'ACTIVE_LTS',

    /**
     * Not the newest lts version available.
     */
    ACTIVE_LTS_OUTDATED = 'ACTIVE_LTS_OUTDATED',

    /**
     * This version is currently alive and well.
     */
    ACTIVE = 'ACTIVE',

    /**
     * Not the newest version available.
     */
    ACTIVE_OUTDATED = 'ACTIVE_OUTDATED',

    /**
     * This version is in a security fixes only state
     * and will reach end of life soon.
     */
    SECURITY_ONLY = 'SECURITY_ONLY',

    /**
     * Not the newest security fix available.
     */
    SECURITY_ONLY_OUTDATED = 'SECURITY_ONLY_OUTDATED',

    /**
     * This version should be dead but received an extended lifetime support.
     */
    EXTENDED_LIFETIME = 'EXTENDED_LIFETIME',

    /**
     * Not the newest version available.
     */
    EXTENDED_LIFETIME_OUTDATED = 'EXTENDED_LIFETIME_OUTDATED',

    /**
     * This version has reached its end of life.
     */
    DEAD = 'DEAD',

    /**
     * Although dead, it's not the newest dead version.
     */
    DEAD_OUTDATED = 'DEAD_OUTDATED'
}

/**
 *
 */
export interface VersionResponse {
    number: string;
    state: VersionState;
    badgeUrl?: string;
    releaseDate?: string;
    endDate?: string;
    url?: string;
}

/**
 *
 */
export interface VersionList {
    [key: string]: VersionResponse;
}

/**
 *
 */
class PhpService {

    /**
     *
     */
    public async list(): Promise<VersionList> {

        return new Promise((resolve, reject) => {

            fs.readFile(file, { encoding: 'utf-8', flag: 'r' }, (err, data) => {

                if (err || data === undefined) {
                    return reject(new Error('Failed to open data json ' + file))
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
            fs.readFile(file, { encoding: 'utf-8', flag: 'r' }, (err, data) => {

                if (err || data === undefined) {
                    return reject(new Error('Failed to open data json ' + file))
                }

                const json: VersionList = JSON.parse(data)

                if (!json[version]) {
                    return reject(new Error('Version not found: ' + version))
                }

                json[version].number = version
                json[version].badgeUrl = 'https://img.shields.io/badge/php-' + version + '-black?style=flat-square'

                return resolve(json[version])
            })
        })
    }
}

export const phpService: PhpService = new PhpService()
