import { assert, expect } from 'chai'
import { phpService } from '../../src/service/Php'
import { VersionResponse, VersionState } from '../../src/Types'

describe('PHP Service', () => {

    it('should return version information for valid version', () => {

        return phpService.getVersion('2.0.0')
            .then((data: VersionResponse) => {
                expect(data.state).to.equal(VersionState.DEAD_OUTDATED)
                expect(data.identifier).to.equal('2.0.0')
            })
            .catch(error => {
                assert.isUndefined(error)
            })
    })

    it('should throw error on invalid version', () => {

        return phpService.getVersion('1.0.0')
            .catch(error => {
                assert.isDefined(error)
            })

    })
})
