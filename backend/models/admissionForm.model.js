const mongoose = require('mongoose')

var admissionSchema = mongoose.Schema({
    formState: {type: String, default: 'Pyyntö saapunut'},
    basicInformationId: { type: String },
    thlRequestId: { type: String },
    admissionNoteDate: { type: Date },
    formSender: {type: String},
    name: { type: String },
    lastname: { type: String },
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
    hazardAssesment: { type: Boolean },
    diaariNumber: { type: String },
    datePrescribedForPsychiatricAssesment: { type: String },
    nativeLanguage: { type: String },
    desiredLanguageOfBusiness: { type: String },
    municipalityOfResidence: { type: String },
    prosecuted: { type: Boolean },
    deadlineForProsecution: { type: String },
    preTrialPoliceDepartment: { type: String },
    crime: { type: String },
    crimes: { type: String },
    assistantsEmail: { type: String },
    assistantsPhonenumber: { type: String },
    assistantsAddress: { type: String },
    legalGuardianEmail: { type: String },
    legalGuardianPhonenumber: { type: String },
    legalGuardianAddress: { type: String },
    legalGuardianInstitute: { type: String },
    appealedDecision: { type: String },
    conclusionIsReady: { type: Boolean },
    proceedingIsReady: { type: Boolean },
    applicationForASummonsIsReady: { type: Boolean },
    transcriptOfCriminalRecordIsReady: { type: Boolean },
    preliminaryInvestigationsAttachmentsAreReady: { type: Boolean },
    decisionOnDetentionIsReady: { type: Boolean },
    imprisonmentRequirementReady: { type: Boolean },
    statement: { type: String },
    statement_draft: [],
    attachments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'attachmentForm'
        }
    ],
    researchUnit: { type: String },
    researchUnitInformation: { type: String }
},
{timestamps: true})

admissionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

admissionSchema.plugin(require('../utils/admissionLog-plugin'))

module.exports = mongoose.model('admissionForm', admissionSchema)