// eslint-disable-next-line no-unused-vars
const _ = require('lodash')
const LogSchema = require('../models/log.model')
const { getDiff } = require('../utils/logger')

const plugin = function (schema) {
    schema.post('init', doc => {
        doc._original = doc.toObject({transform: false})
    })
    schema.pre('save', function (next) {
        if (this.isNew) {
            next()
        }else {
            this._diff = getDiff(this, this._original)
            next()
        }
    })

    schema.methods.log = function (data)  {
        data.diff = {
            before: this._original,
            after: this._diff,
        }
        return LogSchema.create(data)
    }
}

module.exports = plugin