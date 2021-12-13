const Mailer = require('../services/mailer.js')
const HelperFunctions = require('../utils/helperFunctions.js')
const basinInformationsRouter = require('express').Router()
const BasicInformationForm = require('../models/basicInformationForm.model.js')


basinInformationsRouter.get('/basic_information/:id', async (req, res) => {
    const data = await BasicInformationForm.find({}).catch((err) => {console.log(err)})
    res.json(data.filter(d => d.id === req.params.id).map(data => data.toJSON()))
})

basinInformationsRouter.post('/basic_information_form', async (req, res) => {
    const data = req.body

    const basicInformationForm = new BasicInformationForm({
        admissionNoteSenderOrganization: data.admissionNoteSenderOrganization,
        admissionNoteSender: data.admissionNoteSender,
        sendersEmail: data.sendersEmail,
        sendersPhoneNumber: data.sendersPhoneNumber,
        attachments: []
    })

    if (!HelperFunctions.validateBasicInformationData(basicInformationForm)) {
        res.sendStatus(400)
    } else {
        const savedForm = await basicInformationForm.save()
        const response = [
            savedForm.admissionNoteSenderOrganization,
            savedForm.admissionNoteSender,
            savedForm.sendersEmail,
            savedForm.sendersPhoneNumber
        ]
        res.json(response)
        Mailer.sendLinkToAdmissionForm(savedForm.sendersEmail, savedForm.id)
    }
})

module.exports = basinInformationsRouter
