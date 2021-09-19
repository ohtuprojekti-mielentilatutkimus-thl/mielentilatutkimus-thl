
const admissionsRouter = require('express').Router()
const Form = require('../models/form.model.js')


admissionsRouter.get('/', async (req, res) => {
    
    const data = await Form.find({})
    res.json(data.map(data => data.toJSON()))
})


admissionsRouter.post('/', async (req, res) => {
    const data = req.body
    console.log('req body: ')
    console.log(data)
    console.log('------')

    const form = new Form({
        hello: data.hello,
        //basic information
        admissionNoteDate: data.admissionNoteDate,
        name: data.name,
        lastName: data.lastName,
        identificationNumber: data.identificationNumber,
        address: data.address,
        location: data.location,
        processAddress: data.processAddress,
        trustee: data.trustee,
        citizenship: data.citizenship,
        admissionNoteSenderOrganization: data.admissionNoteSender,
        admissionNoteSender: data.admissionNoteSender,
        sendersEmail: data.sendersEmail,
        sendersPhoneNumber: data.sendersPhoneNumber,
        sendersAddress: data.sendersAddress,
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
    const savedForm = await form.save()
    res.json(savedForm.toJSON())
    console.log('Lomake tallennettu')
})

module.exports = admissionsRouter