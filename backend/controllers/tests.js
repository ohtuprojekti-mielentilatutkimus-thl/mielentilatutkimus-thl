const testsRouter = require('express').Router()

const AdmissionForm = require('../models/admissionForm.model.js')
const BasicInformationForm = require('../models/basicInformationForm.model.js')


testsRouter.post('/reset', async (req, res) => {
    await AdmissionForm.deleteMany({})
    await BasicInformationForm.deleteMany({})

    res.status(204).end()
})



module.exports = testsRouter
