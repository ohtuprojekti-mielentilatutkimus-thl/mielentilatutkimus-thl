
const attachmentsRouter = require('express').Router()
const FileHandler = require('../services/fileHandler')
const AttachmentForm = require('../models/attachmentForm.model')
const AdmissionForm = require('../models/admissionForm.model')
const path = require('path')
const users = require('../utils/users')

attachmentsRouter.get('/admission_form_attachment/:attachmentId', async (req, res) => {
    const attachmentsForm = await AdmissionForm.find({attachments:{_id: (req.params.attachmentId) }}).select('researchUnit')
    const attachmentsResearchUnit = (attachmentsForm[0].researchUnit)
    if (!users.isFromTHL(req) && !users.isFromResearchUnit(req, attachmentsResearchUnit)) {
        return res.sendStatus(403)
    }
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

module.exports = attachmentsRouter
