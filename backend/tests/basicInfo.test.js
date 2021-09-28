/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const AdmissionForm = require('../models/admissionForm.model.js')
const BasicInformationForm = require('../models/basicInformationForm.model.js')


describe('when db is initialized with data', () => {

    beforeEach(async () => {
        await AdmissionForm.deleteMany({})
        await BasicInformationForm.deleteMany({})
        //await AdmissionForm.insertMany(helper.init_db)
        const newBasicsForm = new BasicInformationForm(helper.init_basics)
        newBasicsForm.save()
    })    
    
    test('basic information can be retrieved from db with GET and is returned as json', async () => {
        await api
            .get('/basic_information/testID')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

})

describe('when db is empty', () => {


    beforeEach(async () => {
        await AdmissionForm.deleteMany({})
        await BasicInformationForm.deleteMany({})
    })    

    test('basic information can be saved to database', async () => {
        const basicInfo = {
            admissionNoteSenderOrganization: 'org',
            admissionNoteSender: 'sender',
            sendersEmail: 'smth@email.yes',
            sendersPhoneNumber: '0351254536',
        }

        await api
            .post('/basic_information_form')
            .send(basicInfo)        
      
        const basicsInDb = await helper.basicsInDb()

        expect(basicsInDb).toHaveLength(1)
    })
}),



afterAll(() => {
    mongoose.connection.close()
})