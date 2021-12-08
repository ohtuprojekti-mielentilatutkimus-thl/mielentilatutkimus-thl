const AttachmentForm = require('../models/attachmentForm.model.js')
const AdmissionForm = require('../models/admissionForm.model.js')

const FileHandler = require('../services/fileHandler')
//const path = require('path')


async function attachFile(admissionFormId, files, filesInfo, username, role) {
    const parsedFilesInfo = JSON.parse(filesInfo)

    files.forEach(file => {
        const attachmentForm = new AttachmentForm({
            admissionFormId: admissionFormId,
            fileName: file.originalname,
            fileData: file.buffer,
            whichFile: parsedFilesInfo.find(fileInfo => fileInfo.name === file.originalname).whichFile
        })
        
        attachmentForm.save().then(savedFile => {
            return AdmissionForm.findByIdAndUpdate(
                admissionFormId,
                {
                    $push: {
                        attachments: {
                            _id: savedFile._id
                        }
                    }
                }
            )
        })
        attachmentForm.log({
            action: 'save_attachment',
            category: 'attachments',
            createdBy: username ? username  : 'undefined',
            createdByRole: role ? role : 'undefined',
            message: 'Liitetiedosto tallennettu',
        })
    })
}

async function getFile(id, username, role) {
    const attachmentFile = await AttachmentForm.findById(id).catch((err) => {console.log(err)})
    const fileBuffer = Buffer.from(attachmentFile.fileData)

    // currently assumed that all files are pdf, different file types might require other handling
    await FileHandler.bufferToPdf(fileBuffer, attachmentFile.fileName)

    attachmentFile.log({
        action: 'get_attachment',
        category: 'attachments',
        createdBy: username ? username : 'user not found',
        createdByRole: role ? role : 'undefined',
        message: `Liitetiedosto '${attachmentFile.fileName}' avattu`
    })
    return attachmentFile
}

module.exports = { attachFile, getFile }