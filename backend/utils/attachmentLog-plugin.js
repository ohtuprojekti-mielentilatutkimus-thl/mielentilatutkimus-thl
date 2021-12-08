// eslint-disable-next-line no-unused-vars
const LogSchema = require('../models/log.model')

const plugin = function (schema) {
    
    schema.post('init', doc => {
        doc._original = doc.toObject({transform: false})
    })
    schema.pre('save', function (next) {
        next()
    })

    schema.methods.log = function (data)  {
        
        data.attachmentId = this._id
        data.formId = this.admissionFormId

        return LogSchema.create(data)
    }
    
}

module.exports = plugin