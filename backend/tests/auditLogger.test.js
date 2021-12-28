/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')

const baseUrl = '/api/admissions'
const thlBaseUrl = '/api/thl/admissions'

const fs = require('fs')
const path = require('path')

const Attachment = require('../services/attachment')

const api = supertest(app)

const admissionService = require('../services/admissionService')

const AdmissionForm = require('../models/admissionForm.model.js')
const AttachmentForm = require('../models/attachmentForm.model')
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

const testUsername = 'testUsername'
const testRole = 'testRole'

let admissionId
let token

describe('Save Admission', () => {


    beforeAll(async () => {
        await AdmissionForm.deleteMany({})
        await Log.deleteMany({})
        await AttachmentForm.deleteMany({})

        let testBasicInfoId = await helper.saveTestBasicInfoFormAndReturnId()
        await admissionService.saveAdmission({ ...helper.admissionFormTestData, basicInformation: testBasicInfoId })
        await new Promise((r) => setTimeout(r, 500))
        
        const admissions = await helper.admissionsInDb()
        admissionId = admissions[0].id

    })

    test('saved admission is logged with proper category, message and admission id', async () => {
        const latestLog = await helper.getLatestLog()

        expect(latestLog.action).toBe('save_admission_form')
        expect(latestLog.message).toBe('Tutkimuspyyntö tallennettu')
        expect(latestLog.formId.toString()).toBe(admissionId)

    })

    describe('Save Attachment', () => {

        let attachmentId
        let attachment

        beforeAll(async () => {
            await helper.postTestPdf(api, admissionId)
        
            const attachments = await helper.attachmentsInDb()
            attachmentId = attachments[0].id
            attachment = attachments[0]

            await new Promise((r) => setTimeout(r, 500))
        
        })
        
        test('saved attachment is logged with proper category, message, form id and attachment id', async () => {
            const latestLog = await helper.getLatestLog()

            expect(latestLog.action).toBe('save_attachment')
            expect(latestLog.message).toBe(`Liitetiedosto '${attachment.fileName}' tallennettu`)
            expect(latestLog.formId.toString()).toBe(admissionId)
            expect(latestLog.attachmentId.toString()).toBe(attachmentId)
        })

        describe('Get Attachment', () => {

            beforeAll(async () => {
                Attachment.getFile(attachmentId, testUsername, testRole)
                await new Promise((r) => setTimeout(r, 500))
        
            })

            test('get attachment is logged with proper category, message, form id and attachment id', async () => {
                const latestLog = await helper.getLatestLog()

                expect(latestLog.action).toBe('get_attachment')
                expect(latestLog.message).toBe(`Liitetiedosto '${attachment.fileName}' avattu`)
                expect(latestLog.formId.toString()).toBe(admissionId)
                expect(latestLog.attachmentId.toString()).toBe(attachmentId)
                    
            })
        })

    })

    describe('Get Admission', () => {
        beforeAll(async () => {
            await admissionService.getAdmission(admissionId, testUsername , testRole)
            await new Promise((r) => setTimeout(r, 1000))
        })

        test('get request is logged with proper category and message', async () => {
            const latestLog = await helper.getLatestLog()
    
            expect(latestLog.action).toBe('get_admission_form')
            expect(latestLog.message).toBe('Tutkimuspyyntö avattu')
        })

        test('log includes username and role specified in the method parameters', async () => {
            const latestLog = await helper.getLatestLog()

            expect(latestLog.createdBy).toBe(testUsername)
            expect(latestLog.createdByRole).toBe(testRole)
        })
        
    })

    describe('Update Admission', () => {
        beforeAll(async () => {
            const savedAdmission = await helper.admissionsInDb()
            await admissionService.updateAdmission(savedAdmission[0].id, 
                { ...helper.admissionFormTestData, lastname: 'vaihtunutSukunimi'},
                testUsername , testRole)
            
            await new Promise((r) => setTimeout(r, 1000))
        })

        test('log includes "original/changed" versions of edited admission form', async () => {
            const log = await helper.getLatestLog()

            let before = log.diff.original
            let after = log.diff.changed

            // should not match since 'lastname' and 'updatedAt' were updated
            expect(before).not.toMatchObject(after)
        
            // should only have the two fields that changed
            expect(Object.keys(after)).toHaveLength(2)

            after = helper.omit(after, 'lastname', 'updatedAt')

            // should match since two updated values are excluded
            expect(after).toMatchObject({})

        })

        test('log includes username and role specified in the method parameters', async () => {
            const latestLog = await helper.getLatestLog()

            expect(latestLog.createdBy).toBe(testUsername)
            expect(latestLog.createdByRole).toBe(testRole)
        })
        
        describe('Update Same Admission Twice', () => {
            beforeAll(async () => {
                const savedAdmission = await helper.admissionsInDb()
                await admissionService.updateAdmission(savedAdmission[0].id, { ...helper.admissionFormTestData,
                    lastname: 'vaihtunutSukunimi',
                    name: 'vaihtunutEtunimi'})
                
                await new Promise((r) => setTimeout(r, 1000))
            })

            test('diff.original contains the document before changes and diff.after only the new change', async () => {
                const log = await helper.getLatestLog()

                let before = log.diff.original
                let after = log.diff.changed

                // should not match since 'name' and 'updatedAt' were updated
                expect(before).not.toMatchObject(after)
        
                // should only have the two fields that changed
                expect(Object.keys(after)).toHaveLength(2)

                after = helper.omit(after, 'name', 'updatedAt')

                // should match since two updated values are excluded
                expect(after).toMatchObject({})
            })
        })
    })    
})