/* eslint-disable no-undef */
const supertest = require('supertest')
const app = require('../app')
const baseUrl = '/api/admissions'
const api = supertest(app)
const helper = require('./test_helper')
const MailDev = require('maildev')

const AdmissionForm = require('../models/admissionForm.model.js')
const BasicInformationForm = require('../models/basicInformationForm.model.js')

jest.setTimeout(30000)

const maildev = new MailDev({ disableWeb: true, verbose: true, ip: '127.0.0.1' })
maildev.listen()

beforeEach(async () => {
    maildev.deleteAllEmail(function(err) {
        expect(err).toBeNull()
    })
    await AdmissionForm.deleteMany({})
    await BasicInformationForm.deleteMany({})
})

afterAll(() => {
    maildev.close()
})

test('Link to admission form is sent after POST request', async () => {
    const basicInfo = helper.basic_information_input

    await api
        .post(baseUrl+'/basic_information_form')
        .send(basicInfo)        
        .expect(200)
        .expect('Content-Type', /application\/json/)

    await new Promise((t) => setTimeout(t, 1000))
    const basicsInDb = await helper.basicsInDb()
    expect(basicsInDb.length).toBe(1)
    maildev.getAllEmail(function (err, emails) {
        expect(err).toBeNull()
        expect(emails.length).toBe(1)
        email = emails[0]
        expect(email.to).toStrictEqual([{ address: basicInfo.sendersEmail, name: '' }])
        expect(email.text.includes(basicsInDb[0].id)).toBe(true)
    })
})

test('Confirmation is sent after POST request', async () => {
    const admission_form = helper.admission_form_input

    await api
        .post(baseUrl+'/admission_form')
        .send(admission_form)        
        .expect(200)
        .expect('Content-Type', /application\/json/)

    await new Promise((t) => setTimeout(t, 1000))
    const admissionsInDb = await helper.admissionsInDb()
    expect(admissionsInDb.length).toBe(1)
    maildev.getAllEmail(function (err, emails) {
        expect(err).toBeNull()
        expect(emails.length).toBe(1)
        email = emails[0]
        expect(email.to).toStrictEqual([{ address: admission_form.formSender, name: '' }])
        console.log(email, email.text)
        expect(email.text.includes(admissionsInDb[0].diaariNumber)).toBe(true)
        expect(email.text.includes(admissionsInDb[0].id)).toBe(true)
    })
})