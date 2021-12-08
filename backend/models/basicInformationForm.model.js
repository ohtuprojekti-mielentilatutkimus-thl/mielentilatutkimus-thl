const mongoose = require('mongoose')

var basicInformationSchema = mongoose.Schema({

    organization: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
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