const Mailer = require('../services/mailer.js')
const Attachment = require('../services/attachment.js')
const HelperFunctions = require('../utils/helperFunctions.js')
const uploadFile = require('../utils/upload.js')
const attachmentsRouter = require('express').Router()
const FileHandler = require('../services/fileHandler')
const AdmissionForm = require('../models/admissionForm.model.js')
const AttachmentForm = require('../models/attachmentForm.model')
const path = require('path')


attachmentsRouter.post('/upload_form', async (req, res) => {

    const data = req.body

    if (!HelperFunctions.validatePoliceEmailAddress(data.email)) {
        res.sendStatus(500)

    } else {

        var id = null
        var formInfo = null

        var forms = await AdmissionForm.find({}).catch((err) => {console.log(err)})
        var form_by_thlId = forms.filter(d => d.id === data.value)

        if(form_by_thlId[0] !== undefined) {
            id = form_by_thlId[0].id
            formInfo = 'THL-id: '+ form_by_thlId[0].id
        }
        if(id !== null){
            res.json(Mailer.sendLinkToAddingAttachments(data.email, id, formInfo))
        } else {
            res.send('')
        }
    }
})

attachmentsRouter.get('/admission_form_attachment/:attachmentId', async (req, res) => {
    const attachmentFile = await AttachmentForm.findById(req.params.attachmentId).catch((err) => {console.log(err)})

    const fileBuffer = Buffer.from(attachmentFile.fileData)

    // currently assumed that all files are pdf, different file types might require other handling
    await FileHandler.bufferToPdf(fileBuffer, attachmentFile.fileName)
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

        Attachment.attachFile(req.params.id, req.files, req.body.filesInfo)
        
        res.status(200).send({
            message: 'ok'
        })   
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err })
    }
})

module.exports = attachmentsRouter
