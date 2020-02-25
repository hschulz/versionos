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

    /**
     *
     */
    identifier: string;

    /**
     *
     */
    state: VersionState;

    /**
     *
     */
    badgeUrl?: string;

    /**
     *
     */
    releaseDate?: string;

    /**
     *
     */
    endDate?: string;

    /**
     *
     */
    url?: string;
}

/**
 * An object containing a version identifier that maps
 * to a version response object.
 */
export interface VersionList {
    [key: string]: VersionResponse;
}
