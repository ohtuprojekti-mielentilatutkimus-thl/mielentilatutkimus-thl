const mongoose = require('mongoose')

var schema = mongoose.Schema({
    hello: { type: String },
    //basic information
    admissionNoteDate: { type: Date },
    name: { type: String },
    lastName: { type: String },
    identificationNumber: { type: String },
    address: { type: String },
    location: { type: String },
    processAddress: { type: String },
    trustee: { type: String },
    citizenship: { type: String },
    admissionNoteSenderOrganization: { type: String },
    admissionNoteSender: { type: String },
    sendersEmail: { type: String },
    sendersPhoneNumber: { type: String },
    sendersAddress: { type: String },
    // THL more information
    hazardAssesment: { type: Boolean },
    diaariNumber: { type: String },
    datePrescribedForPsychiatricAssesment: { type: String },
    nativeLanguage: { type: String },
    desiredLanguageOfBusiness: { type: String },
    municipalityOfResidence: { type: String },
    prosecuted: { type: String },
    deadlineForProsecution: { type: String },
    pretrialPoliceDepartment: { type: String },
    emailFromTheDirectorOfInvestigations: { type: String },
    phoneNumberFromTheDirectorOfInvestigations: { type: String },
    addressFromTheDirectorOfInvestigations: { type: String },
    crime: { type: String },
    crimes: { type: String },
    assistantEmail: { type: String },
    asssistantPhoneNumber: { type: String },
    assisstantsAddress: { type: String },
    legalGuardianEmail: { type: String },
    legalGuardianPhoneNumber: { type: String },
    legalGuardianAddress: { type: String },
    legalGuardianInstitute: { type: String },
    appealedDecision: { type: String },
    // TBD: attachments: { type: String },
    conclusionIsReady: { type: Boolean },
    proceedingIsReady: { type: Boolean },
    applicationForASummonsIsReady: { type: Boolean },
    transcriptOfCriminalRecordIsReady: { type: Boolean },
    preliminaryInvestigationsAttachmentsAreReady: { type: Boolean },
    decisionOnDetentionIsReady: { type: Boolean },
    imprisonmentRequirementReady: { type: Boolean }


})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('admissionForm', schema)