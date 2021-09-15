const mongoose = require('mongoose')

var schema = mongoose.Schema({
    hello: {
        type: String
    }            
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Form', schema)