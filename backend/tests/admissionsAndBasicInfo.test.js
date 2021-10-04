/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const baseUrl = '/api/admissions'

const api = supertest(app)

const AdmissionForm = require('../models/admissionForm.model.js')
const BasicInformationForm = require('../models/basicInformationForm.model.js')


describe('when db is initialized with data', () => {

    beforeEach(async () => {
        await AdmissionForm.deleteMany({})
        await BasicInformationForm.deleteMany({})
        
        const newBasicsForm = new BasicInformationForm(helper.basic_information_input)
        await newBasicsForm.save()

        const newAdmissionForm = new AdmissionForm(helper.admission_form_input)
        await newAdmissionForm.save()

    })    
    
    test('basic information is returned as json', async () => {
        await api
            .get(baseUrl+'/basic_information/anything')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('basic information can be retrieved from db', async () => {
        const basicsInDb = await helper.basicsInDb()
        
        // +1 for id
        const lengthOfInputFields = Object.keys(helper.basic_information_input).length + 1 
        const lengthOfFieldsInDbItem = Object.keys(basicsInDb[0])
        expect(lengthOfFieldsInDbItem).toHaveLength(lengthOfInputFields)
    })

    test('basic information can be retrieved with GET', async () => {
        const basicsInDb = await helper.basicsInDb()
        const idOfItemInDb = basicsInDb[0].id

        const response = await api.get(baseUrl+'/basic_information/'+idOfItemInDb)
        
        const lengthOfInputFields = Object.keys(helper.basic_information_input).length + 1 
        expect(Object.keys(response.body[0])).toHaveLength(lengthOfInputFields)
    })
    
    
    test('(singular) admission form information can be retrieved from db', async () => {
        const admissionsInDb = await helper.admissionsInDb()
        
        // +1 for id
        const lengthOfInputFields = Object.keys(helper.admission_form_input).length + 1 
        const lengthOfFieldsInDbItem = Object.keys(admissionsInDb[0])

        expect(lengthOfFieldsInDbItem).toHaveLength(lengthOfInputFields)
    })    

    test('admission form information can be retrieved with GET', async () => {
        const admissionsInDb = await helper.admissionsInDb()
        const response = await api.get(baseUrl+'/')
        
        const lengthOfItems = admissionsInDb.length 
        expect(response.body).toHaveLength(lengthOfItems)
    })

})

describe('when db is empty', () => {

    beforeEach(async () => {
        await AdmissionForm.deleteMany({})
        await BasicInformationForm.deleteMany({})
    })
    test('basic information can be saved to database with POST', async () => {
        const basicInfo = helper.basic_information_input

        await api
            .post(baseUrl+'/basic_information_form')
            .send(basicInfo)        
      
        const basicsInDb = await helper.basicsInDb()

        expect(basicsInDb).toHaveLength(1)
    })
    
    test('admission form can be saved to database', async () => {
        const admission_form = helper.admission_form_input

        await api
            .post(baseUrl+'/admission_form')
            .send(admission_form)        
  
        const admissionsInDb = await helper.admissionsInDb()

        expect(admissionsInDb).toHaveLength(1)

        const lengthOfInputFields = Object.keys(helper.admission_form_input).length + 1 
        const lengthOfFieldsInDbItem = Object.keys(admissionsInDb[0])

        expect(lengthOfFieldsInDbItem).toHaveLength(lengthOfInputFields)
    })
})



afterAll(() => {
    mongoose.connection.close()
})