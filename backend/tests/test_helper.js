const AdmissionForm = require('../models/admissionForm.model.js')
const BasicInformationForm = require('../models/basicInformationForm.model.js')
const AttachmentForm = require('../models/attachmentForm.model.js')
const testData = require('./test_data.json')
const Log = require('../models/log.model')

let admissionFormTestData = testData.admission_forms[0]
let basicInfoFormTestData = testData.basic_info_forms[0]
let sendToResearchUnitData = testData.send_to_research_unit_form[0]

const admissionsInDb = async () => {
    const admis = await AdmissionForm.find({})
    return admis.map(a => a.toJSON())
}

const admissionInDb = async (id) => {
    const admis = await AdmissionForm.findById(id)
    return admis.toJSON()
        
}
const findLatestAdmissionFromDb = async () => await AdmissionForm.findOne().sort({ createdAt: 'descending' })

const basicsInDb = async () => {
    const basics = await BasicInformationForm.find({})
    return basics.map(a => a.toJSON())
}

const attachmentsInDb = async () => {
    const attachments = await AttachmentForm.find({})
    return attachments.map(a => a.toJSON())
}

const getLog = async () => {
    const log = await Log.find({})
    return log.map(a => a.toJSON())
}

//https://dev.to/nas5w/how-to-select-or-omit-properties-from-an-object-in-javascript-3ina
function omit(obj, ...props) {
    const result = { ...obj }
    props.forEach(function(prop) {
        delete result[prop]
    })
    return result
}

module.exports = {
    admissionFormTestData, basicInfoFormTestData, sendToResearchUnitData,
    admissionsInDb, basicsInDb, attachmentsInDb, findLatestAdmissionFromDb, 
    admissionInDb, omit, getLog
}