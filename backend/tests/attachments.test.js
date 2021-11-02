/* eslint-disable no-undef */
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const baseUrl = '/api/admissions'

const api = supertest(app)

const BasicInformationForm = require('../models/basicInformationForm.model.js')
const AdmissionForm = require('../models/admissionForm.model.js')
const AttachmentForm = require('../models/attachmentForm.model.js')

const fs = require('fs')
const path = require('path')
const { EEXIST } = require('constants')

// tämän tiedoston voisi ehkä refaktoroida siten, että testiliitteet lähetetään kerran beforeAll-metodilla

/*
beforeAll(async () => {
    await AdmissionForm.deleteMany({})

    const newAdmissionForm = new AdmissionForm(helper.admissionFormTestData)
    await newAdmissionForm.save()

    const admissionsInDb = await helper.admissionsInDb()
    const testAdmission = admissionsInDb[0]

    await api
        .post(baseUrl+`/admission_form_attachment/${testAdmission.id}`)
        .attach('file', fs.createReadStream(path.join(__dirname, '../attachments/test_pdf.pdf')))
        .field('whichFile', 'valituomio')
        .field('originalname', 'test_pdf.pdf')
        .expect(200)
})
*/

beforeEach(async () => {
    await AttachmentForm.deleteMany({})
    await BasicInformationForm.deleteMany({})
})    

test('attachment can be sent by a valid user', async () => {
    const newBasicsForm = new BasicInformationForm(helper.basicInfoFormTestData)
    await newBasicsForm.save()
    const basicsInDb = await helper.basicsInDb()
    const basics = basicsInDb[0]

    await api
        .post(baseUrl+`/admission_form_attachment/${basics.id}`)
        .attach('file', fs.createReadStream(path.join(__dirname, '../attachments/selenium-screenshot-62.png')))
        .expect(200)
      
    const attachmentsInDb = await helper.attachmentsInDb()

    expect(attachmentsInDb).toHaveLength(1)
})

test('attachment can\'t be sent without a user', async () => {
    await api
        .post(baseUrl+'/admission_form_attachment')
        .attach('file', fs.createReadStream(path.join(__dirname, '../attachments/selenium-screenshot-62.png')))

    const attachmentsInDb = await helper.attachmentsInDb()
    
    expect(attachmentsInDb).toHaveLength(0)

})

test('attachments have a field describing which file it is', async () => {
    const newBasicsForm = new BasicInformationForm(helper.basicInfoFormTestData)
    await newBasicsForm.save()
    const basicsInDb = await helper.basicsInDb()
    const basics = basicsInDb[0]

    await api
        .post(baseUrl+`/admission_form_attachment/${basics.id}`)
        .attach('file', fs.createReadStream(path.join(__dirname, '../attachments/selenium-screenshot-62.png')))
        .expect(200)
      
    const attachmentsInDb = await helper.attachmentsInDb()

    expect(attachmentsInDb[0].whichFile).not.toBeNull()

})

describe('on requesting an attachment with get-request,', () => {

    test('pdf file is sent to requesting client', async () => {
        await saveTestPdf()
        const testPdf = await AttachmentForm.findOne({ fileName: 'test_pdf.pdf' })
    
        await api
                .get(baseUrl+`/admission_form_attachment/${testPdf.id}`)
                .expect(200)
                .expect('Content-Type', /application\/pdf/)
    })
    
    test('tmp folder exists after the request', () => {
        fs.mkdir(path.join(__dirname, '../tmp'), (err) => {
            expect(err.code).toBe('EEXIST')
        })
    })
    
    test('tmp folder is empty after request', () => {
        fs.readdir(path.join(__dirname, '../tmp'), (err, files) => {
            expect(files).toHaveLength(0)
        })
    })  
})

const saveTestPdf = async () => {
    await AdmissionForm.deleteMany({})

    const newAdmissionForm = new AdmissionForm(helper.admissionFormTestData)
    await newAdmissionForm.save()

    const admissionsInDb = await helper.admissionsInDb()
    const testAdmission = admissionsInDb[0]

    await api
        .post(baseUrl+`/admission_form_attachment/${testAdmission.id}`)
        .attach('file', fs.createReadStream(path.join(__dirname, '../attachments/test_pdf.pdf')))
        .field('whichFile', 'valituomio')
        .field('originalname', 'test_pdf.pdf')
        .expect(200)
}

// selenium screenshot id mongossa: 617f0a4f8cce46342e579118

// tira luku 08 id: 617fc65a5d0e22c0e4597cbf