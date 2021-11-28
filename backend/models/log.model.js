const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const { ObjectId } = Schema

const LogSchema = new Schema({
    action: { type: String, required: true },
    category: { type: String, required: true },
    //createdBy: { type: ObjectId, ref: 'Account', required: true },
    createdBy: { type: String, required: true },
    message: { type: String, required: true },
    diff: { type: Schema.Types.Mixed },
    form_id: {type: String}
},{
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
})

LogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


LogSchema.index({ action: 1, category: 1 })

module.exports = mongoose.model('Log', LogSchema)