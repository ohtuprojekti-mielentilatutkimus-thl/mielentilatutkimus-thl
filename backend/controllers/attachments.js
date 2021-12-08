const Mailer = require('../services/mailer.js')
const Attachment = require('../services/attachment.js')
const HelperFunctions = require('../utils/helperFunctions.js')
const uploadFile = require('../utils/upload.js')
const attachmentsRouter = require('express').Router()

//const AttachmentForm = require('../models/attachmentForm.model.js')

const FileHandler = require('../services/fileHandler')
const AttachmentForm = require('../models/attachmentForm.model')
const AdmissionForm = require('../models/admissionForm.model')
const path = require('path')

attachmentsRouter.get('/admission_form_attachment/:attachmentId', async (req, res) => {
    const attachmentsForm = await AdmissionForm.find({attachments:{_id: (req.params.attachmentId) }}).select('researchUnit')
    const attachmentsResearchUnit = (attachmentsForm[0].researchUnit)
    if (!users.isFromTHL(req) && !users.isFromResearchUnit(req, attachmentsResearchUnit)) {
        return res.sendStatus(403)
    }
    const attachmentFile = await AttachmentForm.findById(req.params.attachmentId).catch((err) => {console.log(err)})

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

attachmentsRouter.get('/admission_form_attachment/:attachmentId', async (req, res) => {
    
    const attachmentFile = await Attachment.getFile(req.params.attachmentId, req.username, req.role)
    res.sendFile(path.resolve('./tmp', attachmentFile.fileName), function (err) {
        if (err) {
            console.log('Error sending file')
        }
   
        FileHandler.deleteTmpFile(attachmentFile.fileName)
    })
})

attachmentsRouter.post('/admission_form_attachment/:id', async (req, res) => {
    try {
        await uploadFile(req, res)
        await Attachment.attachFile(req.params.id, req.files, req.body.filesInfo, req.username, req.role)
           
        res.status(200).send({
            message: 'ok'
        })   
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err })
    }
})

module.exports = attachmentsRouter
