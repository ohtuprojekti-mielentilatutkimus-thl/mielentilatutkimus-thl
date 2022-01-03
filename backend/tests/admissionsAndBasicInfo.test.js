/* eslint-disable no-undef */
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const baseUrl = '/api/admissions'
const thlBaseUrl = '/api/thl/admissions'

const api = supertest(app)

const AdmissionForm = require('../models/admissionForm.model.js')
const BasicInformationForm = require('../models/basicInformationForm.model.js')

//from https://gist.github.com/cjaoude/fd9910626629b53c4d25
const invalid_emails = [
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    '.email@example.com',
    'email.@example.com',
    'email..email@example.com',
    'あいうえお@example.com',
    'email@example.com (Joe Smith)',
    'email@example',
    'email@-example.com',
    'email@111.222.333.44444',
    'email@example..com',
    'Abc..123@example.com',
    'io544+trtglgdfklgört54tärt',
    '',
    'fg34jhm@'
]

let token = ''

beforeAll(async () => {
    const res = await api.post('/api/thl/auth/login').send({username: 'thluser', role: 'THL'}).then()
    token = res.body.accessToken
})

describe('when db is initialized with data', () => {

    beforeEach(async () => {
        await AdmissionForm.deleteMany({})
        await BasicInformationForm.deleteMany({})
        
        const newBasicsForm = new BasicInformationForm(helper.basicInfoFormTestData)
        const basicFormFromDb = await newBasicsForm.save()

        const newAdmissionForm = new AdmissionForm(helper.admissionFormTestData)
        newAdmissionForm.basicInformation = basicFormFromDb.id

        await newAdmissionForm.save()

    })    
    describe('basic information..', () => { 
    
        test('is returned as json', async () => {

            const admissionFromDb = await helper.findLatestAdmissionFromDb()
            await admissionFromDb.populate('basicInformation')

            await api
                .get(baseUrl+'/basic_information/' + admissionFromDb.basicInformation.id)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })
        test('can be retrieved from db', async () => {
            const basicsInDb = await helper.basicsInDb()
            
            // REFACTOR
            // +1 for id field (not included in json)
            const lengthOfInputFields = Object.keys(helper.basicInfoFormTestData).length + 1
            const lengthOfFieldsInDbItem = Object.keys(basicsInDb[0])
            expect(lengthOfFieldsInDbItem).toHaveLength(lengthOfInputFields)
        })

        test('can be retrieved with GET', async () => {
            const basicsInDb = await helper.basicsInDb()
            const idOfItemInDb = basicsInDb[0].id

            const response = await api.get(baseUrl+'/basic_information/'+idOfItemInDb).set('X-Access-Token', token)
            const lengthOfInputFields = Object.keys(helper.basicInfoFormTestData).length + 1
            expect(Object.keys(response.body)).toHaveLength(lengthOfInputFields)
        })

    })
    describe('admission form information..', () => { 
   
        test('can be retrieved from db', async () => {
            const admissionsInDb = await helper.admissionsInDb()
        
            // REFACTOR

            // + 1 for id, + 1 because formState has a default value
            // +2 for createdAt and updatedAt
            // +1 for attachments
            // +1 for thlRequestId
            // +1 for statement

            const lengthOfInputFields = Object.keys(helper.admissionFormTestData).length + 6
            const lengthOfFieldsInDbItem = Object.keys(admissionsInDb[0])

            expect(lengthOfFieldsInDbItem).toHaveLength(lengthOfInputFields)
        })    

        test('can be retrieved with GET', async () => {
            const admissionsInDb = await helper.admissionsInDb()
            const response = await api.get(thlBaseUrl+'/').set('X-Access-Token', token)
        
            const lengthOfItems = admissionsInDb.length 
            expect(response.body).toHaveLength(lengthOfItems)
        })

        
        test('can be retrieved by reseach unit with GET ', async () => {

            const reseachUnit = 'Niuvanniemen sairaala'

            const responseWhenReseachUnitIsNotSet = await api.get(thlBaseUrl+'/thl/research_unit/'+reseachUnit).set('X-Access-Token', token)
            expect(responseWhenReseachUnitIsNotSet.body).toHaveLength(0)

            const newAdmissionForm = new AdmissionForm(helper.admissionFormTestData2)
            await newAdmissionForm.save()
            
            const responseWhenReseachUnitIsSet = await api.get(thlBaseUrl+'/thl/research_unit/'+reseachUnit).set('X-Access-Token', token)
            expect(responseWhenReseachUnitIsSet.body).toHaveLength(1)
        }) 

        test('field ´formState´ can be changed with PUT', async () => {
            let admissionsInDb = await helper.admissionsInDb()
            const idOfItemInDb = admissionsInDb[0].id
            
            const changedAdmissionForm = { ...helper.admissionFormTestData, 
                formState: 'muutettu prosessin tila'}

            await api
                .put(thlBaseUrl+'/thl/'+idOfItemInDb)
                .send(changedAdmissionForm).set('X-Access-Token', token)

            const updatedAdmissionForm = await helper.admissionInDb(idOfItemInDb)
            expect(updatedAdmissionForm.formState).toBe('muutettu prosessin tila')
        })

        test('field ´statement_draft´ can be changed with PUT', async () => {
            let admissionsInDb = await helper.admissionsInDb()
            const idOfItemInDb = admissionsInDb[0].id

            const statementDraft = []
            statementDraft.push('S46.1')
            statementDraft.push('Asiakirjatieto 1, Asiakirjatieto 2')
            statementDraft.push('Näpistys')

            const changedAdmissionForm = { ...helper.admissionFormTestData, 
                statement_draft: statementDraft}
            
            await api
                .put(thlBaseUrl+'/thl/'+idOfItemInDb+'/add_statement_draft')
                .send(changedAdmissionForm).set('X-Access-Token', token)

            const updatedAdmissionForm = await helper.admissionInDb(idOfItemInDb)
            const updatedAdmissionFormStatement = updatedAdmissionForm.statement_draft

            expect(updatedAdmissionFormStatement[0].statement_draft).toMatchObject(statementDraft)
            expect(updatedAdmissionFormStatement[0].statement_draft[0]).toBe('S46.1')
            expect(updatedAdmissionFormStatement[0].statement_draft[1]).toBe('Asiakirjatieto 1, Asiakirjatieto 2')
            expect(updatedAdmissionFormStatement[0].statement_draft[2]).toBe('Näpistys')
        })

        test('field ´statement´ can be changed with PUT', async () => {
            let admissionsInDb = await helper.admissionsInDb()
            const idOfItemInDb = admissionsInDb[0].id

            const added_statement = {statement: 'Diagnoosikoodi: S46.1, Oikeuden asiakirjatiedot: Asiakirjatieto 1, Asiakirjatieto 2, Syytteenalainen teko: Näpistys'}

            const changedAdmissionForm = { ...helper.admissionFormTestData, 
                statement: added_statement,
                formState: 'Lausunto saapunut'}
            
            await api
                .put(thlBaseUrl+'/thl/'+idOfItemInDb+'/add_statement')
                .send(changedAdmissionForm).set('X-Access-Token', token)

            const updatedAdmissionForm = await helper.admissionInDb(idOfItemInDb)
            expect(updatedAdmissionForm.statement).toBe(added_statement.statement)
        })

        //this test does not actually do anything.
        //Result of api.get is status 404, expect not.toBeNull works because value is undefined
        /*
        test('admissionform contains information about the suspect', async () => {
            let admissionsInDb = await helper.admissionsInDb()
            const idOfItemInDb = admissionsInDb[0].id

            const admission = await api.get(baseUrl+'/thl/'+idOfItemInDb)
            expect(admission.name).not.toBeNull()
            expect(admission.lastName).not.toBeNull()
            expect(admission.identificationNumber).not.toBeNull()
            expect(admission.address).not.toBeNull()
        })*/

        test('fields can be changed with PUT', async () => {
            let admissionsInDb = await helper.admissionsInDb()
            const idOfItemInDb = admissionsInDb[0].id
            
            const changedAdmissionForm = { 
                name: 'Risto',
                lastname: 'Roisto',
                address: 'Ristolantie 10a, Raisio',
                location: 'Keravan vankila',
                formState: 'Saatu lisätietoja'
            }
            await api
                .put(baseUrl+'/admission_form/'+idOfItemInDb+'/edit')
                .send(changedAdmissionForm)

            const updatedAdmissionForm = await helper.admissionInDb(idOfItemInDb)
            expect(updatedAdmissionForm.name).toBe('Risto')
            expect(updatedAdmissionForm.lastname).toBe('Roisto')
            expect(updatedAdmissionForm.address).toBe('Ristolantie 10a, Raisio')
            expect(updatedAdmissionForm.location).toBe('Keravan vankila')
            expect(updatedAdmissionForm.formState).toBe('Saatu lisätietoja')
        })

        test('only relevant fields are changed with PUT request to "thl/:id/research_unit"', async ()=> {
            const researchUnitData = helper.sendToResearchUnitData
            
            let admissionsInDb = await helper.admissionsInDb()
            const ItemInDb = admissionsInDb[0]

            await api 
                .put(thlBaseUrl+'/thl/'+ItemInDb.id+'/research_unit')
                .send(researchUnitData).set('X-Access-Token', token)

            const updatedAdmission = await helper.admissionInDb(ItemInDb.id)
            
            expect(updatedAdmission.researchUnit).toBe(researchUnitData.researchUnit)
            expect(updatedAdmission.researchUnitInformation).toBe(researchUnitData.researchUnitInformation)
            expect(updatedAdmission.formState).toBe(researchUnitData.formState)
            
            //Fields that shouldn't match are excluded below 
            const oldAdmissionForm = helper.omit(ItemInDb, 'formState', 'researchUnit', 'researchUnitInformation', 
                'updatedAt')
            const changedAdmissionForm = helper.omit(updatedAdmission, 'formState', 'researchUnit', 'researchUnitInformation', 
                'updatedAt')
                
            expect(oldAdmissionForm).toMatchObject(changedAdmissionForm)
        })

        test('admissionform state is "admission received" by default', async () => {
            const admission_form = helper.admissionFormTestData
            await api
                .post(baseUrl+'/admission_form')
                .send(admission_form) 
            const admissionsInDb = await helper.admissionsInDb()
            expect(admissionsInDb[admissionsInDb.length-1].formState).toBe('Pyyntö saapunut')
           
        }) 
    })
})


describe('when db is empty', () => {

    beforeEach(async () => {
        await AdmissionForm.deleteMany({})
        await BasicInformationForm.deleteMany({})
    })
    describe('basic information', () => {
        const basicInfo = helper.basicInfoFormTestData

        test('can be saved to database with POST', async () => {

            await api
                .post(baseUrl+'/basic_information_form')
                .send(basicInfo)
      
            const basicsInDb = await helper.basicsInDb()

            expect(basicsInDb).toHaveLength(1)
            for (k in basicInfo) {
                expect(basicInfo[k]).not.toBeNull()
                expect(basicInfo[k]).not.toBeUndefined()
                expect(basicInfo[k]).toEqual(basicsInDb[0][k])
            }

            expect(Object.keys(basicInfo).length).toBe(Object.keys(basicsInDb[0]).length-1)//-id and attachments field

        })
        describe('cant be saved to database when', () => {
            
            const basicInfoEmpty = {
                'organization': '',
                'sender': '',
                'email': '',
                'phoneNumber': ''
            }

            test('all input fields are empty', async () => {

                await api
                    .post(baseUrl+'/basic_information_form')
                    .send(basicInfoEmpty)
                    .expect(400)
            })

            describe('fields are valid except..', () => {
                
                for (var key of Object.keys(basicInfo)) {
                    test(`input field ${key} is empty`, async () => {
                        await api
                            .post(baseUrl+'/basic_information_form')
                            .send({...basicInfo, [key]: ''})
                            .expect(400)
                    })
                }
            })
        })

        test('does not allow invalid email address', async () => {
            const testData = { ...basicInfo }
            for (i in invalid_emails) {
                testData.email = invalid_emails[i]
                await api
                    .post(baseUrl+'/basic_information_form')
                    .send(testData).expect(400)
            }
        })

    })
    describe('admission form', () => {
    
        test('can be saved to database with POST', async () => {
            const newBasicsForm = new BasicInformationForm(helper.basicInfoFormTestData)
            const basicFormFromDb = await newBasicsForm.save()
    
            const admissionForm = helper.admissionFormTestData
            admissionForm.basicInformation = basicFormFromDb.id

            await api
                .post(baseUrl+'/admission_form')
                .send(admissionForm)
                .expect(200)        

            const admissionsInDb = await helper.admissionsInDb()

            expect(admissionsInDb).toHaveLength(1)
            // + 1 for id, + 1 because formState has a default value
            // +2 for createdAt and updatedAt
            //+1 for attachments
            // +1 for thlRequestId
            // +1 for statement
            const lengthOfInputFields = Object.keys(helper.admissionFormTestData).length + 6
            const lengthOfFieldsInDbItem = Object.keys(admissionsInDb[0])

            expect(lengthOfFieldsInDbItem).toHaveLength(lengthOfInputFields)
        })

        test('does not allow invalid email address', async () => {
            var testData = { ...helper.admissionFormTestData }

            for (i in invalid_emails) {
                testData.assistantsEmail = invalid_emails[i]
                await api
                    .post(baseUrl+'/admission_form')
                    .send(testData).expect(500)
                testData = helper.admissionFormTestData
                testData.legalGuardianEmail = invalid_emails[i]
                await api
                    .post(baseUrl+'/admission_form')
                    .send(testData).expect(500)
            }
        })
    })
    
})