// eslint-disable-next-line no-unused-vars
const LogSchema = require('../models/log.model')
const { getDiff } = require('./logger')

const plugin = function (schema) {
    
    schema.post('init', doc => {
        doc._original = doc.toObject({transform: false})
    })
    schema.pre('save', function (next) {
        next()
        /*
        if (this.isNew || this.collection.collectionName === 'attachmentforms') {
            next()
        } else {
            
            const originalToJson = JSON.parse(JSON.stringify(this._original))
            originalToJson.id = originalToJson._id.toString()
            delete originalToJson._id
            delete originalToJson.__v

            this._diff = getDiff(JSON.parse(JSON.stringify(this)), originalToJson)
            
            next()
        }*/
    })

    schema.methods.log = function (data)  {
        /*
        data.diff = {
            original: this._original,
            changed: this._diff
            
        }
        */
        data.attachmentId = this._id
        data.formId = this.admissionFormId

        return LogSchema.create(data)
    }
    
}

module.exports = plugin