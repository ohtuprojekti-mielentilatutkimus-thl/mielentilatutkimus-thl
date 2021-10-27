const AttachmentForm = require('../models/attachmentForm.model.js')
const AdmissionForm = require('../models/admissionForm.model.js')

async function attachFile(admissionFormId, fileName, fileData, whichFile) {
    //console.log(req)
    console.log(admissionFormId)
    const attachmentForm = new AttachmentForm({
        //admissionFormId: admissionFormId,
        fileName: fileName,
        fileData: fileData,
        whichFile: whichFile
    })
    //console.log(fileData)
    await attachmentForm.save().then(savedFile => AdmissionForm.findByIdAndUpdate(
        admissionFormId,
        {
            $push: {
                attachments: {
                    _id: savedFile._id,
                    //_fileName: savedFile.fileName,
                    //_fileData: savedFile.fileData
                }
            }
        }
    ))
}

module.exports = { attachFile }