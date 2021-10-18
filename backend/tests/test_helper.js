const AdmissionForm = require('../models/admissionForm.model.js')
const BasicInformationForm = require('../models/basicInformationForm.model.js')
const AttachmentForm = require('../models/attachmentForm.model.js')
const testData = require('./test_data.json')

let admissionFormTestData = testData.admission_forms[0]
let basicInfoFormTestData = testData.basic_info_forms[0]

const admission_form_input = {
    // using default value for formState
    //basicInformation id
    basicInformationId: '',
    admissionNoteDate: '',
    formSender: 'smth@email.yes',
    name: '',
    lastname: '',
    identificationNumber: '',
    address: '',
    location: '',
    processAddress: '',
    trustee: '',
    citizenship: '',
    admissionNoteSendingOrganization: '',
    admissionNoteSender: '',
    sendersEmail: '',
    sendersPhoneNumber: '',
    // THL more information
    hazardAssesment: false,
    diaariNumber: 'R 20 / 123',
    datePrescribedForPsychiatricAssesment: '',
    nativeLanguage: '',
    desiredLanguageOfBusiness: '',
    municipalityOfResidence: '',
    prosecuted: false,
    deadlineForProsecution: '',
    preTrialPoliceDepartment: '',
    emailFromTheDirectorOfInvestigation: '',
    phonenumberFromTheDirectorOfInvestigation: '',
    addressFromTheDirectorOfInvestigation: '',
    crime: '',
    crimes: '',
    assistantsEmail: '',
    assistantsPhonenumber: '',
    assistantsAddress: '',
    legalGuardianEmail: '',
    legalGuardianPhonenumber: '',
    legalGuardianAddress: '',
    legalGuardianInstitute: '',
    appealedDecision: '',
    // TBD: attachments: ,
    conclusionIsReady: false,
    proceedingIsReady: false,
    applicationForASummonsIsReady: false,
    transcriptOfCriminalRecordIsReady: false,
    preliminaryInvestigationsAttachmentsAreReady: false,
    decisionOnDetentionIsReady: false,
    imprisonmentRequirementReady: false
}

const basic_information_input = {
    admissionNoteSenderOrganization: 'org',
    admissionNoteSender: 'sender',
    sendersEmail: 'smth@email.yes',
    sendersPhoneNumber: '0351254536',
    attachements: []
}

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
    admission_form_input, basic_information_input, admissionFormTestData, basicInfoFormTestData, admissionsInDb, basicsInDb, attachmentsInDb
}