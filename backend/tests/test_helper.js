const AdmissionForm = require('../models/admissionForm.model.js')
const BasicInformationForm = require('../models/basicInformationForm.model.js')

const init_admissions = {
    //basicInformation id
    basicInformationId: '',
    admissionNoteDate: '',
    name: '',
    lastName: '',
    identificationNumber: '',
    address: '',
    location: '',
    processAddress: '',
    trustee: '',
    citizenship: '',
    // THL more information
    hazardAssesment: '',
    diaariNumber: '',
    datePrescribedForPsychiatricAssesment: '',
    nativeLanguage: '',
    desiredLanguageOfBusiness: '',
    municipalityOfResidence: '',
    prosecuted: '',
    deadlineForProsecution: '',
    pretrialPoliceDepartment: '',
    emailFromTheDirectorOfInvestigations: '',
    phoneNumberFromTheDirectorOfInvestigations: '',
    addressFromTheDirectorOfInvestigations: '',
    crime: '',
    crimes: '',
    assistantEmail: '',
    asssistantPhoneNumber: '',
    assisstantsAddress: '',
    legalGuardianEmail: '',
    legalGuardianPhoneNumber: '',
    legalGuardianAddress: '',
    legalGuardianInstitute: '',
    appealedDecision: '',
    // TBD: attachments: ,
    conclusionIsReady: '',
    proceedingIsReady: '',
    applicationForASummonsIsReady: '',
    transcriptOfCriminalRecordIsReady: '',
    preliminaryInvestigationsAttachmentsAreReady: '',
    decisionOnDetentionIsReady: '',
    imprisonmentRequirementReady: ''
}

const init_basics = {
    admissionNoteSenderOrganization: '',
    admissionNoteSender: '',
    sendersEmail: '',
    sendersPhoneNumber: '',
    id: 'testID'
}


const admissionsInDb = async () => {
    const admis = await AdmissionForm.find({})
    return admis.map(a => a.toJSON())
}

const basicsInDb = async () => {
    const admis = await BasicInformationForm.find({})
    return admis.map(a => a.toJSON())
}

module.exports = {
    init_admissions, init_basics, admissionsInDb, basicsInDb
}