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
    describe('basic information..', () => { 
    
        test('is returned as json', async () => {
            await api
                .get(baseUrl+'/basic_information/anything')
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })
        test('can be retrieved from db', async () => {
            const basicsInDb = await helper.basicsInDb()
        
            // +1 for id
            const lengthOfInputFields = Object.keys(helper.basic_information_input).length + 1 
            const lengthOfFieldsInDbItem = Object.keys(basicsInDb[0])
            expect(lengthOfFieldsInDbItem).toHaveLength(lengthOfInputFields)
        })

        test('can be retrieved with GET', async () => {
            const basicsInDb = await helper.basicsInDb()
            const idOfItemInDb = basicsInDb[0].id

            const response = await api.get(baseUrl+'/basic_information/'+idOfItemInDb)
        
            const lengthOfInputFields = Object.keys(helper.basic_information_input).length + 1 
            expect(Object.keys(response.body[0])).toHaveLength(lengthOfInputFields)
        })
    })
    describe('admission form information..', () => { 
   
        test('can be retrieved from db', async () => {
            const admissionsInDb = await helper.admissionsInDb()
        
            // + 1 for id, + 1 because formState has a default value
            const lengthOfInputFields = Object.keys(helper.admission_form_input).length + 2
            const lengthOfFieldsInDbItem = Object.keys(admissionsInDb[0])

            expect(lengthOfFieldsInDbItem).toHaveLength(lengthOfInputFields)
        })    

        test('can be retrieved with GET', async () => {
            const admissionsInDb = await helper.admissionsInDb()
            const response = await api.get(baseUrl+'/')
        
            const lengthOfItems = admissionsInDb.length 
            expect(response.body).toHaveLength(lengthOfItems)
        })

        test('field ´formState´ can be changed with PUT', async () => {
            let admissionsInDb = await helper.admissionsInDb()
            const idOfItemInDb = admissionsInDb[0].id
            
            const changedAdmissionForm = { ...helper.admission_form_input, 
                formState: 'muutettu prosessin tila'}

            await api
                .put(baseUrl+'/thl/'+idOfItemInDb)
                .send(changedAdmissionForm)

            admissionsInDb = await helper.admissionsInDb()
            const updatedAdmissionForm = admissionsInDb.find(item => item.id===idOfItemInDb)
            expect(updatedAdmissionForm.formState).toBe('muutettu prosessin tila')
        })

        test('admissionform contains information about the suspect', async () => {
            let admissionsInDb = await helper.admissionsInDb()
            const idOfItemInDb = admissionsInDb[0].id

            const admission = await api.get(baseUrl+'/thl/'+idOfItemInDb)
            expect(admission.name).not.toBeNull()
            expect(admission.lastName).not.toBeNull()
            expect(admission.identificationNumber).not.toBeNull()
            expect(admission.address).not.toBeNull()
        })

        test('admissionform state is waiting for review by default', async () => {
            const admission_form = helper.admission_form_input
            await api
                .post(baseUrl+'/admission_form')
                .send(admission_form)  
            const admissionsInDb = await helper.admissionsInDb()
            expect(admissionsInDb[admissionsInDb.length-1].formState).toBe('Odottaa tarkistusta')
            
        })
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
    
    test('admission form can be saved to database with POST', async () => {
        const admission_form = helper.admission_form_input

        await api
            .post(baseUrl+'/admission_form')
            .send(admission_form)        
  
        const admissionsInDb = await helper.admissionsInDb()

        expect(admissionsInDb).toHaveLength(1)

        const lengthOfInputFields = Object.keys(helper.admission_form_input).length + 2
        const lengthOfFieldsInDbItem = Object.keys(admissionsInDb[0])

        expect(lengthOfFieldsInDbItem).toHaveLength(lengthOfInputFields)
    })


})



afterAll(() => {
    mongoose.connection.close()
})