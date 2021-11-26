/* eslint-disable no-undef */
const helper = require('./test_helper')


/* api not tested here atm
const baseUrl = '/api/admissions'
const api = supertest(app)
const supertest = require('supertest')
const app = require('../app')
*/

const admissionService = require('../services/admissionService')

const AdmissionForm = require('../models/admissionForm.model.js')
const Log = require('../models/log.model')

const { getDiff } = require('../utils/logger')

test('getDiff only returns difference between objects', async () => {
    const before = {
        Key: 'Value',
        Key2: 'Value2'
    }
    const after = {
        Key: 'Value3',
        Key2: 'Value2'
    }

    const difference = getDiff(after, before)
    expect(Object.keys(difference)).toHaveLength(1)

})

describe('Save Admission', () => {
    beforeAll(async () => {
        await AdmissionForm.deleteMany({})
        await Log.deleteMany({})

        await admissionService.saveAdmission({ ...helper.admissionFormTestData })
        await new Promise((r) => setTimeout(r, 1000))  
    })
    test('saved admission is logged', async () => {
        const latestLog = await helper.getLatestLog()

        expect(latestLog.action).toBe('save_admission_form')
        expect(latestLog.message).toBe('Tutkimuspyyntö tallennettu')

    })

    describe('Update Admission', () => {
        beforeAll(async () => {
            const savedAdmission = await helper.admissionsInDb()
            await admissionService.updateAdmission(savedAdmission[0].id, { ...helper.admissionFormTestData, lastname: 'vaihtunutSukunimi'})
            
            await new Promise((r) => setTimeout(r, 1000))
        })

        test('log includes "original/changed" versions of edited admission form', async () => {
            const log = await helper.getLatestLog()

            let before = log.diff.original
            let after = log.diff.changed

            // should not match since 'lastname' and 'updatedAt' were updated
            expect(before).not.toMatchObject(after)
        
            before = helper.omit(before, 'lastname', 'updatedAt')
            after = helper.omit(after, 'lastname', 'updatedAt')

            // should match since two updated values are excluded
            expect(before).toMatchObject(after)
        })
        describe('Update Same Admission Twice', () => {
            beforeAll(async () => {
                const savedAdmission = await helper.admissionsInDb()
                await admissionService.updateAdmission(savedAdmission[0].id, { ...helper.admissionFormTestData,
                    lastname: 'vaihtunutSukunimi',
                    name: 'vaihtunutEtunimi'})
                
                await new Promise((r) => setTimeout(r, 1000))
            })

            test('diff.original contains the recent field change and diff.after only the new change', async () => {
                const log = await helper.getLatestLog()

                let before = log.diff.original
                let after = log.diff.changed

                // should not match since 'name' and 'updatedAt' were updated
                expect(before).not.toMatchObject(after)
        
                before = helper.omit(before, 'name', 'updatedAt')
                after = helper.omit(after, 'name', 'updatedAt')

                // should match since two updated values are excluded
                expect(before).toMatchObject(after)
            })
        })
    })
    describe('Get Admission', () => {
        beforeAll(async () => {
            const savedAdmission = await helper.admissionsInDb()
            await admissionService.getAdmission(savedAdmission[0].id)
            await new Promise((r) => setTimeout(r, 1000))
        })

        test('get request is logged', async () => {
            const latestLog = await helper.getLatestLog()
    
            expect(latestLog.action).toBe('get_admission_form')
            expect(latestLog.message).toBe('Tutkimuspyyntö avattu')
        })
    })
})