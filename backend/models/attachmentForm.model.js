const mongoose = require('mongoose')

var attachmentSchema = mongoose.Schema({
    fileName: { type: String },
    fileData: { type: Buffer }
})

attachmentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('attachmentForm', attachmentSchema)