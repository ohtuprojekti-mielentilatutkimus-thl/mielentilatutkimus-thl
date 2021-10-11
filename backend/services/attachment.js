const AttachmentForm = require('../models/attachmentForm.model.js')
const BasicInformationForm = require('../models/basicInformationForm.model.js')

async function attachFile(basicInformationId, fileName, fileData, whichFile) {
    //console.log(req)
    const attachmentForm = new AttachmentForm({
        basicInformationId: basicInformationId,
        fileName: fileName,
        fileData: fileData,
        whichFile: whichFile
    })
    //console.log(fileData)
    await attachmentForm.save().then(savedFile => BasicInformationForm.findByIdAndUpdate(
        basicInformationId,
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