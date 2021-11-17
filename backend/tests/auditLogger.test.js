/* eslint-disable no-undef */
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const baseUrl = '/api/admissions'

const api = supertest(app)

const AdmissionForm = require('../models/admissionForm.model.js')
const BasicInformationForm = require('../models/basicInformationForm.model.js')
const Log = require('../models/log.model')

const thisYearAsString = () => new Date().getFullYear().toString()

describe('PUT', () => {
    beforeAll(async ()=> {
        await AdmissionForm.deleteMany({})
        await BasicInformationForm.deleteMany({})
        await Log.deleteMany({})
    
        const newBasicsForm = new BasicInformationForm(helper.basicInfoFormTestData)
        await newBasicsForm.save()
            
        const newAdmissionForm = new AdmissionForm({ ...helper.admissionFormTestData,
            formState: 'Pyydetty lisätietoja' })
        newAdmissionForm.thlRequestId = 'THL_OIKPSYK_' + thisYearAsString() + '-1'
        const savedAdmissionForm = await newAdmissionForm.save()

        await api
            .put(baseUrl+`/admission_form/${savedAdmissionForm.id}/edit`)
            .send({ ...helper.admissionFormTestData, lastname: 'vaihtunutSukunimi'})
    
    })
    test('log includes: action, category, createdBy, message', async () => {
        
    })

    test('log includes "before/after" versions of edited admission form', async () => {
        const log = await helper.getLog()
        let before = log[0].diff.before
        let after = log[0].diff.after

        // should not match since 'lastname' and 'updatedAt' were updated
        expect(before).not.toMatchObject(after)
        
        before = helper.omit(before, 'lastname', 'updatedAt')
        after = helper.omit(after, 'lastname', 'updatedAt')

        // should match since two updated values are excluded
        expect(before).toMatchObject(after)

    })
    
})