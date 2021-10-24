/* eslint-disable no-undef */
// this file's code is ran in every test suite (=test file in our case) after finishing
const mongoose = require('mongoose')

afterAll(async () => {
    await mongoose.connection.close()
})