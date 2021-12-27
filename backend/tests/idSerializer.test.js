/* eslint-disable no-undef */

const idSerializer = require('../services/idSerializer')

const idStart = 'THL_OIKPSYK_'

describe('idSerializer returns', () => {

    test('the next successive id', () => {
        let testId = idStart + '2021-9'

        expect(idSerializer.getNextThlRequestId(testId)).toEqual(idStart + '2021-10')
    })

    test('1 when year has changed between admissions', () => {
        let testId = idStart + '-2020-10'

        expect(idSerializer.getNextThlRequestId(testId)).toEqual(idStart + '2021-1')
    })

    test('1 when database is empty', () => {
        const expectedId = idStart + new Date().getFullYear().toString() + '-1'

        expect(idSerializer.getNextThlRequestId(null)).toEqual(expectedId)
        expect(idSerializer.getNextThlRequestId(undefined)).toEqual(expectedId)
    })
})