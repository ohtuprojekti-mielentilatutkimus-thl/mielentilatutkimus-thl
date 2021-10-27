const mongoose = require('mongoose')

var basicInformationSchema = mongoose.Schema({
    //basic information
    //oldId: { type: String },

    admissionNoteSenderOrganization: { type: String },
    admissionNoteSender: { type: String },
    sendersEmail: { type: String },
    sendersPhoneNumber: { type: String }
})

basicInformationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('basicInformationForm', basicInformationSchema)