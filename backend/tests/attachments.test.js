/* eslint-disable no-undef */
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const baseUrl = '/api/admissions'

const api = supertest(app)

const AdmissionForm = require('../models/admissionForm.model.js')
const AttachmentForm = require('../models/attachmentForm.model.js')

const fs = require('fs')
const path = require('path')

let testAdmissionId

let token = ''

beforeAll(async () => {
    await AdmissionForm.deleteMany({})

    const newAdmissionForm = new AdmissionForm(helper.admissionFormTestData)
    await newAdmissionForm.save()

    const admissionsInDb = await helper.admissionsInDb()
    testAdmissionId = admissionsInDb[0].id

    const res = await api.post('/api/auth/login').send({username: 'thluser', role: 'THL'}).then()
    token = res.body.accessToken
})

beforeEach(async () => {
    await AttachmentForm.deleteMany({})
})    

describe('when sending an attachment with post-request', () => {

    test('attachment can be sent by a valid user', async () => {
        await api
            .post(baseUrl+`/admission_form_attachment/${testAdmissionId}`)
            .field('filesInfo', '[{"name": "selenium-screenshot-62.png", "whichFile": "poytakirja"}]')
            .attach('files', fs.createReadStream(path.join(__dirname, '../attachments/selenium-screenshot-62.png')))
            .expect(200)
          
        const attachmentsInDb = await helper.attachmentsInDb()
    
        expect(attachmentsInDb).toHaveLength(1)
    })
    
    
    test('attachment can\'t be sent without a user', async () => {
        await api
            .post(baseUrl+'/admission_form_attachment')
            .field('filesInfo', '[{"name": "selenium-screenshot-62.png", "whichFile": "poytakirja"}]')
            .attach('files', fs.createReadStream(path.join(__dirname, '../attachments/selenium-screenshot-62.png'))).set('X-Access-Token', token)
    
        const attachmentsInDb = await helper.attachmentsInDb()
        
        expect(attachmentsInDb).toHaveLength(0)
    
    })
    
    test('attachments have a field describing which file it is', async () => {
        await api
            .post(baseUrl+`/admission_form_attachment/${testAdmissionId}`)
            .field('filesInfo', '[{"name": "selenium-screenshot-62.png", "whichFile": "poytakirja"}]')
            .attach('files', fs.createReadStream(path.join(__dirname, '../attachments/selenium-screenshot-62.png')))
            .expect(200)
          
        const attachmentsInDb = await helper.attachmentsInDb()

        expect(attachmentsInDb[0].whichFile).toEqual('poytakirja')
    })

    test('multiple attachments of different types can be sent on same request', async () => {

        await api
            .post(baseUrl+`/admission_form_attachment/${testAdmissionId}`)
            .field('filesInfo', '[{"name": "selenium-screenshot-62.png", "whichFile": "poytakirja"}, {"name": "test_pdf.pdf", "whichFile": "valituomio"}]')
            .attach('files', fs.createReadStream(path.join(__dirname, '../attachments/selenium-screenshot-62.png')))
            .attach('files', fs.createReadStream(path.join(__dirname, '../attachments/test_pdf.pdf')))
            .expect(200)

        const attachmentsInDb = await helper.attachmentsInDb()
        
        expect(attachmentsInDb.length).toEqual(2)
    })

    test('multiple attachments of same type can be sent on same request', async () => {

        await api
            .post(baseUrl+`/admission_form_attachment/${testAdmissionId}`)
            .field('filesInfo', '[{"name": "selenium-screenshot-62.png", "whichFile": "poytakirja"}, {"name": "test_pdf.pdf", "whichFile": "poytakirja"}]')
            .attach('files', fs.createReadStream(path.join(__dirname, '../attachments/selenium-screenshot-62.png')))
            .attach('files', fs.createReadStream(path.join(__dirname, '../attachments/test_pdf.pdf')))
            .expect(200)

        const attachmentsInDb = await helper.attachmentsInDb()

        expect(attachmentsInDb.length).toEqual(2)
    })

})

describe('on requesting an attachment with get-request,', () => {

    test('pdf file can be sent to requesting client', async () => {
        await postTestPdf()
        const testPdf = await AttachmentForm.findOne({ fileName: 'test_pdf.pdf' })
    
        await api
            .get(baseUrl+`/admission_form_attachment/${testPdf.id}`).set('X-Access-Token', token)
            .expect(200)
            .expect('Content-Type', /application\/pdf/)
    })
    
    test('tmp folder exists after a request', () => {
        fs.mkdir(path.join(__dirname, '../tmp'), (err) => {
            expect(err.code).toBe('EEXIST')
        })
    })
    
    test('tmp folder is empty after a request', () => {
        fs.readdir(path.join(__dirname, '../tmp'), (err, files) => {
            expect(files).toHaveLength(0)
        })
    })  
})

const postTestPdf = async () => {
    await api
        .post(baseUrl+`/admission_form_attachment/${testAdmissionId}`)
        .attach('files', fs.createReadStream(path.join(__dirname, '../attachments/test_pdf.pdf')))
        .field('filesInfo', '[{"name": "test_pdf.pdf", "whichFile": "valituomio"}]')
        .field('originalname', 'test_pdf.pdf')
        .expect(200)
}