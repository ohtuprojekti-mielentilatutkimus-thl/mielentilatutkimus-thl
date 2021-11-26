// eslint-disable-next-line no-unused-vars
//const _ = require('lodash')
const LogSchema = require('../models/log.model')
const { getDiff } = require('../utils/logger')

const plugin = function (schema) {
    
    schema.post('init', doc => {
        doc._original = doc.toObject({transform: false})
    })
    schema.pre('save', function (next) {
        if (this.isNew) {
            next()
        } else {
            // toJSON ei toiminut joten tässä käytetty rumempaa tapaa
            const originalToJson = JSON.parse(JSON.stringify(this._original))
            originalToJson.id = originalToJson._id.toString()
            delete originalToJson._id
            delete originalToJson.__v
            
            this._diff = getDiff(JSON.parse(JSON.stringify(this)), originalToJson)
            next()
        }
    })

    schema.methods.log = function (data)  {
        data.diff = {
            original: this._original,
            changed: this._diff
        }
        data.form_id = this.id

        return LogSchema.create(data)
    }
}

module.exports = plugin