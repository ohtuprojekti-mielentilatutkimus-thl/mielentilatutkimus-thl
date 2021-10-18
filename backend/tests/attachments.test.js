/* eslint-disable no-undef */
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const baseUrl = '/api/admissions'

const api = supertest(app)

const BasicInformationForm = require('../models/basicInformationForm.model.js')
const AttachmentForm = require('../models/attachmentForm.model.js')

const fs = require('fs')
const path = require('path')

beforeEach(async () => {
    await AttachmentForm.deleteMany({})
    await BasicInformationForm.deleteMany({})
})    

test('attachment can be sent by a valid user', async () => {
    const newBasicsForm = new BasicInformationForm(helper.basic_information_input)
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
    const newBasicsForm = new BasicInformationForm(helper.basic_information_input)
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
