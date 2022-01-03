// wiping test database after all tests are finished and initializing it with test data for development use
module.exports =  async () => {
    if (process.env.GITHUB_ACTIONS || process.env.NODE_ENV !== 'test') {
        return
    }

    const supertest = require('supertest')
    const mongoose = require('mongoose')
    const app = require('../app')
    const helper = require('./test_helper')
    const api = supertest(app)

    console.log('teardown - clearing test database and initializing it with some data')
    await mongoose.connection.dropDatabase()

    const basicId = await helper.saveTestBasicInfoFormAndReturnId()

    for (let i = 0; i < helper.allBasicInfoJsons.length; i++) {

        let admis = {
            ...helper.allAdmissionJsons[i],
            basicInformation: basicId
        }

        await api
            .post('/api/admissions/admission_form')
            .send(admis)
    }   
    console.log('teardown complete')

    await mongoose.connection.close()
}