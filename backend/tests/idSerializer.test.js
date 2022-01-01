/* eslint-disable no-undef */

const idSerializer = require('../services/idSerializer')

const idStart = 'THL_OIKPSYK_'
const currYear = new Date().getFullYear().toString()

describe('idSerializer returns', () => {

    test('the next successive id', () => {
        let testId = idStart + currYear + '-9'

        expect(idSerializer.getNextThlRequestId(testId)).toEqual(idStart + currYear + '-10')
    })

    test('1 when year has changed between admissions', () => {
        let prevYear = parseInt(currYear) - 1
        let testId = idStart + prevYear + '-10'

        expect(idSerializer.getNextThlRequestId(testId)).toEqual(idStart + currYear + '-1')
    })

    test('1 when database is empty', () => {
        const expectedId = idStart + currYear + '-1'

        expect(idSerializer.getNextThlRequestId(null)).toEqual(expectedId)
        expect(idSerializer.getNextThlRequestId(undefined)).toEqual(expectedId)
    })
})