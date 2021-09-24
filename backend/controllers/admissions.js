const Mailer = require('../services/mailer.js')

const admissionsRouter = require('express').Router()

const AdmissionForm = require('../models/admissionForm.model.js')
const BasicInformationForm = require('../models/basicInformationForm.model.js')

admissionsRouter.get('/basic_information/:id', async (req, res) => {
    const data = await BasicInformationForm.find().catch((err) => {console.log(err)})
    res.json(data.filter(d => d.id === req.params.id).map(data => data.toJSON()))
})


admissionsRouter.post('/basic_information_form', async (req, res) => {
    const data = req.body

    const basicInformationForm = new BasicInformationForm({
        //basic information
        admissionNoteSenderOrganization: data.admissionNoteSenderOrganization,
        admissionNoteSender: data.admissionNoteSender,
        sendersEmail: data.sendersEmail,
        sendersPhoneNumber: data.sendersPhoneNumber,
        //sendersAddress: data.sendersAddress 
    })
    const savedForm = await basicInformationForm.save()
    res.json(savedForm.toJSON())
    
    Mailer.sendLinkToAdmissionForm(savedForm.sendersEmail, savedForm.id)

})

admissionsRouter.post('/admission_form', async (req, res) => {
    const data = req.body

    const admissionForm = new AdmissionForm({
        //basicInformation id
        basicInformationId: data.basicInformationId,
        admissionNoteDate: data.admissionNoteDate,
        name: data.name,
        lastName: data.lastName,
        identificationNumber: data.identificationNumber,
        address: data.address,
        location: data.location,
        processAddress: data.processAddress,
        trustee: data.trustee,
        citizenship: data.citizenship,
        // THL more information
        hazardAssesment: data.hazardAssesment,
        diaariNumber: data.diaariNumber,
        datePrescribedForPsychiatricAssesment: data.datePrescribedForPsychiatricAssesment,
        nativeLanguage: data.nativeLanguage,
        desiredLanguageOfBusiness: data.desiredLanguageOfBusiness,
        municipalityOfResidence: data.municipalityOfResidence,
        prosecuted: data.prosecuted,
        deadlineForProsecution: data.deadlineForProsecution,
        pretrialPoliceDepartment: data.pretrialPoliceDepartment,
        emailFromTheDirectorOfInvestigations: data.emailFromTheDirectorOfInvestigations,
        phoneNumberFromTheDirectorOfInvestigations: data.phoneNumberFromTheDirectorOfInvestigations,
        addressFromTheDirectorOfInvestigations: data.addressFromTheDirectorOfInvestigations,
        crime: data.crime,
        crimes: data.crimes,
        assistantEmail: data.assistantEmail,
        asssistantPhoneNumber: data.asssistantPhoneNumber,
        assisstantsAddress: data.assisstantsAddress,
        legalGuardianEmail: data.legalGuardianEmail,
        legalGuardianPhoneNumber: data.legalGuardianPhoneNumber,
        legalGuardianAddress: data.legalGuardianAddress,
        legalGuardianInstitute: data.legalGuardianInstitute,
        appealedDecision: data.appealedDecision,
        // TBD: attachments: ,
        conclusionIsReady: data.conclusionIsReady,
        proceedingIsReady: data.proceedingIsReady,
        applicationForASummonsIsReady: data.applicationForASummonsIsReady,
        transcriptOfCriminalRecordIsReady: data.transcriptOfCriminalRecordIsReady,
        preliminaryInvestigationsAttachmentsAreReady: data.preliminaryInvestigationsAttachmentsAreReady,
        decisionOnDetentionIsReady: data.decisionOnDetentionIsReady,
        imprisonmentRequirementReady: data.imprisonmentRequirementReady 
    })
    const savedForm = await admissionForm.save()
    res.json(savedForm.toJSON())
    
    Mailer.sendConfirmation(data.sendersEmail, savedForm.diaariNumber, savedForm.id)

})

module.exports = admissionsRouter