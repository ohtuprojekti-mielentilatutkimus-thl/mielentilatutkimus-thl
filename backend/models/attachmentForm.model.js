const mongoose = require('mongoose')

var attachmentSchema = mongoose.Schema({
    fileName: { type: String },
    fileData: { type: Buffer },
    whichFile: { type: String },
    admissionFormId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref:'admissionForm' }
})

attachmentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
attachmentSchema.plugin(require('../utils/attachmentLog-plugin'))

module.exports = mongoose.model('attachmentForm', attachmentSchema)