const uploadFile = require('../utils/upload.js')

const attachmentsRouter = require('express').Router()
const Attachment = require('../services/attachment.js')

const FileHandler = require('../services/fileHandler')
const AdmissionForm = require('../models/admissionForm.model')
const path = require('path')
const users = require('../utils/users')

attachmentsRouter.get('/admission_form_attachment/:attachmentId', async (req, res) => {
    const attachmentsForm = await AdmissionForm.find({attachments:{_id: (req.params.attachmentId) }}).select('researchUnit')
    const attachmentsResearchUnit = (attachmentsForm[0].researchUnit)
    if (!users.isFromTHL(req) && !users.isFromResearchUnit(req, attachmentsResearchUnit)) {
        return res.sendStatus(403)
    }
    const attachmentFile = await Attachment.getFile(req.params.attachmentId, req.username, req.role)
    
    // currently assumed that all files are pdf, different file types might require other handling
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
