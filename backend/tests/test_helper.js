const AdmissionForm = require('../models/admissionForm.model.js')
const BasicInformationForm = require('../models/basicInformationForm.model.js')
const AttachmentForm = require('../models/attachmentForm.model.js')
const testData = require('./test_data.json')
const Log = require('../models/log.model')

const fs = require('fs')
const path = require('path')
const baseUrl = '/api/admissions'

let admissionFormTestData = testData.admission_forms[0]
let admissionFormTestData2 = testData.admission_forms[1]
let basicInfoFormTestData = testData.basic_info_forms[0]
let sendToResearchUnitData = testData.send_to_research_unit_form[0]

let allBasicInfoJsons = testData.basic_info_forms
let allAdmissionJsons = testData.admission_forms

const admissionsInDb = async () => {
    const admis = await AdmissionForm.find({})
    return admis.map(a => a.toJSON())
}

const admissionInDb = async (id) => {
    const admis = await AdmissionForm.findById(id)
    return admis.toJSON()
        
}
const findLatestAdmissionFromDb = async () => {
    const admis = await AdmissionForm.findOne().sort({ createdAt: 'descending' })
    return admis
}

const findBasicInformationFromDb = async () => {
    const basicInfo = await BasicInformationForm.findOne()
    return basicInfo.toJSON()
}

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

const getLatestLog = async () => {
    const log = await Log.findOne().sort({ createdAt: 'descending' })
    return log.toJSON()
}

const saveTestBasicInfoFormAndReturnId = async () => {
    let formToSave = new BasicInformationForm(basicInfoFormTestData)
    let savedBasicInfo = await formToSave.save(formToSave)
    return savedBasicInfo.id
}

//https://dev.to/nas5w/how-to-select-or-omit-properties-from-an-object-in-javascript-3ina
function omit(obj, ...props) {
    const result = { ...obj }
    props.forEach(function(prop) {
        delete result[prop]
    })
    return result
}

const postTestPdf = async (api, admissionId) => {
    await api
        .post(baseUrl+`/admission_form_attachment/${admissionId}`)
        .attach('files', fs.createReadStream(path.join(__dirname, './attachments/test_pdf.pdf')))
        .field('filesInfo', '[{"name": "test_pdf.pdf", "whichFile": "valituomio"}]')
        .field('originalname', 'test_pdf.pdf')
        .expect(200)
}

module.exports = {
    admissionFormTestData, admissionFormTestData2, basicInfoFormTestData, sendToResearchUnitData, allBasicInfoJsons, allAdmissionJsons,
    admissionsInDb, basicsInDb, attachmentsInDb, findLatestAdmissionFromDb, findBasicInformationFromDb, saveTestBasicInfoFormAndReturnId,
    admissionInDb, omit, getLog, getLatestLog, postTestPdf
}