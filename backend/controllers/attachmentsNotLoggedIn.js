const Mailer = require('../services/mailer.js')
const Attachment = require('../services/attachment.js')
const HelperFunctions = require('../utils/helperFunctions.js')
const uploadFile = require('../utils/upload.js')
const sendAttachmentsRouter = require('express').Router()
const AdmissionForm = require('../models/admissionForm.model.js')

sendAttachmentsRouter.post('/upload_form', async (req, res) => {

    const data = req.body

    if (!HelperFunctions.validatePoliceEmailAddress(data.email)) {
        res.sendStatus(500)

    } else {

        var id = null
        var formInfo = null

        var forms = await AdmissionForm.find({}).catch((err) => {console.log(err)})
        var form_by_diaariNumber = forms.filter(d => d.diaariNumber === data.value)
        var form_by_thlId = forms.filter(d => d.id === data.value)

        if(form_by_diaariNumber[0] !== undefined){
            id = form_by_diaariNumber[0].id
            formInfo = 'diaarinumero: '+ form_by_diaariNumber[0].diaariNumber
        }
        if(form_by_thlId[0] !== undefined) {
            id = form_by_thlId[0].id
            formInfo = 'THL-id: '+ form_by_thlId[0].thlRequestId
        }
        if(id !== null){
            res.json(Mailer.sendLinkToAddingAttachments(data.email, id, formInfo))
        } else {
            res.send('')
        }
    }
})

sendAttachmentsRouter.post('/admission_form_attachment/:id', async (req, res) => {
    try {
        await uploadFile(req, res)

        Attachment.attachFile(req.params.id, req.files, req.body.filesInfo)
        
        res.status(200).send({
            message: 'ok'
        })   
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err })
    }
})

module.exports = sendAttachmentsRouter
