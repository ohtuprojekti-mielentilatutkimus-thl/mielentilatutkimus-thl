const AdmissionForm = require('../models/admissionForm.model.js')
const BasicInformationForm = require('../models/basicInformationForm.model.js')
const AttachmentForm = require('../models/attachmentForm.model.js')
const testData = require('./test_data.json')

let admissionFormTestData = testData.admission_forms[0]
let basicInfoFormTestData = testData.basic_info_forms[0]

const admissionsInDb = async () => {
    const admis = await AdmissionForm.find({})
    return admis.map(a => a.toJSON())
}

const basicsInDb = async () => {
    const basics = await BasicInformationForm.find({})
    return basics.map(a => a.toJSON())
}

const attachmentsInDb = async () => {
    const attachments = await AttachmentForm.find({})
    return attachments.map(a => a.toJSON())
}

module.exports = {
    admissionFormTestData, basicInfoFormTestData, admissionsInDb, basicsInDb, attachmentsInDb
}