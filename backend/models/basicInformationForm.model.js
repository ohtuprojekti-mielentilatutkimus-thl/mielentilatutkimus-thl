const mongoose = require('mongoose')

var basicInformationSchema = mongoose.Schema({
    //basic information
    //oldId: { type: String },

    admissionNoteSenderOrganization: {
        type: String,
        required: true
    },
    admissionNoteSender: {
        type: String,
        required: true
    },
    sendersEmail: {
        type: String,
        required: true
    },
    sendersPhoneNumber: {
        type: String,
        required: true
    }
})

basicInformationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('basicInformationForm', basicInformationSchema)