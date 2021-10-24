const Mailer = require('../services/mailer.js')
const Attachment = require('../services/attachment.js')

const uploadFile = require('../utils/upload.js')

const admissionsRouter = require('express').Router()

const AdmissionForm = require('../models/admissionForm.model.js')
const BasicInformationForm = require('../models/basicInformationForm.model.js')

admissionsRouter.get('/', async (req, res) => {
    const admissionForms = await AdmissionForm.find({})
    res.json(admissionForms.map((admissionform) => admissionform.toJSON()))
})
  
admissionsRouter.get('/basic_information/:id', async (req, res) => {
    const data = await BasicInformationForm.find({}).catch((err) => {console.log(err)})
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
        attachments: []
    })
    const savedForm = await basicInformationForm.save()
    const response = [
        savedForm.admissionNoteSenderOrganization,
        savedForm.admissionNoteSender,
        savedForm.sendersEmail,
        savedForm.sendersPhoneNumber
    ]
    
    res.json(response)
    Mailer.sendLinkToAdmissionForm(savedForm.sendersEmail, savedForm.id)

})

//testauksessa ei toimi vielä
/*
admissionsRouter.get('/admission_form/basic_information/:id', async (req, res) => {
    const data = await BasicInformationForm.find().catch((err) => {console.log(err)})
    res.json(data.filter(d => d.id === req.params.id).map(data => data.toJSON()))
})*/

admissionsRouter.put('/thl/:id', async (req, res) => {
    const data = req.body
  
    const form = {
        formState : data.formState,
        basicInformationId: data.basicInformationId,
        admissionNoteDate: data.admissionNoteDate,
        formSender : data.formSender,
        name: data.name,
        lastName: data.lastname,
        identificationNumber: data.identificationNumber,
        address: data.address,
        location: data.location,
        processAddress: data.processAddress,
        trustee: data.trustee,
        citizenship: data.citizenship,
        admissionNoteSendingOrganization : data.admissionNoteSendingOrganization,
        admissionNoteSender : data.admissionNoteSender,
        sendersEmail : data.sendersEmail,
        sendersPhoneNumber : data.sendersPhoneNumber,
        // THL more information
        hazardAssesment: data.hazardAssesment,
        diaariNumber: data.diaariNumber,
        datePrescribedForPsychiatricAssesment: data.datePrescribedForPsychiatricAssesment,
        nativeLanguage: data.nativeLanguage,
        desiredLanguageOfBusiness: data.desiredLanguageOfBusiness,
        municipalityOfResidence: data.municipalityOfResidence,
        prosecuted: data.prosecuted,
        deadlineForProsecution: data.deadlineForProsecution,
        preTrialPoliceDepartment: data.preTrialPoliceDepartment,
        emailFromTheDirectorOfInvestigation: data.emailFromTheDirectorOfInvestigation,
        phonenumberFromTheDirectorOfInvestigation: data.phonenumberFromTheDirectorOfInvestigation,
        addressFromTheDirectorOfInvestigation: data.addressFromTheDirectorOfInvestigation,
        crime: data.crime,
        crimes: data.crimes,
        assistantsEmail: data.assistantsEmail,
        assistantsPhonenumber: data.assistantsPhonenumber,
        assistantsAddress: data.assistantsAddress,
        legalGuardianEmail: data.legalGuardianEmail,
        legalGuardianPhonenumber: data.legalGuardianPhonenumber,
        legalGuardianAddress: data.legalGuardianAddress,
        legalGuardianInstitute: data.legalGuardianInstitute,
        appealedDecision: data.appealedDecision,
        // TBD: attachments: ,
        //attachments: data.attachments,
        conclusionIsReady: data.conclusionIsReady,
        proceedingIsReady: data.proceedingIsReady,
        applicationForASummonsIsReady: data.applicationForASummonsIsReady,
        transcriptOfCriminalRecordIsReady: data.transcriptOfCriminalRecordIsReady,
        preliminaryInvestigationsAttachmentsAreReady: data.preliminaryInvestigationsAttachmentsAreReady,
        decisionOnDetentionIsReady: data.decisionOnDetentionIsReady,
        imprisonmentRequirementReady: data.imprisonmentRequirementReady    
    }

    AdmissionForm.findByIdAndUpdate(req.params.id, form, {new: true})
        .then(updatedForm => {
            res.json(updatedForm.toJSON())
        })

  
})


admissionsRouter.post('/admission_form', async (req, res) => {
    const data = req.body

    const admissionForm = new AdmissionForm({
        //basicInformation id
        formState : data.formState,
        basicInformationId: data.basicInformationId,
        admissionNoteDate: data.admissionNoteDate,
        formSender : data.formSender,
        name: data.name,
        lastname: data.lastname,
        identificationNumber: data.identificationNumber,
        address: data.address,
        location: data.location,
        processAddress: data.processAddress,
        trustee: data.trustee,
        citizenship: data.citizenship,
        admissionNoteSendingOrganization : data.admissionNoteSendingOrganization,
        admissionNoteSender : data.admissionNoteSender,
        sendersEmail : data.sendersEmail,
        sendersPhoneNumber : data.sendersPhoneNumber,
        // THL more information
        hazardAssesment: data.hazardAssesment,
        diaariNumber: data.diaariNumber,
        datePrescribedForPsychiatricAssesment: data.datePrescribedForPsychiatricAssesment,
        nativeLanguage: data.nativeLanguage,
        desiredLanguageOfBusiness: data.desiredLanguageOfBusiness,
        municipalityOfResidence: data.municipalityOfResidence,
        prosecuted: data.prosecuted,
        deadlineForProsecution: data.deadlineForProsecution,
        preTrialPoliceDepartment: data.preTrialPoliceDepartment,
        emailFromTheDirectorOfInvestigation: data.emailFromTheDirectorOfInvestigation,
        phonenumberFromTheDirectorOfInvestigation: data.phonenumberFromTheDirectorOfInvestigation,
        addressFromTheDirectorOfInvestigation: data.addressFromTheDirectorOfInvestigation,
        crime: data.crime,
        crimes: data.crimes,
        assistantsEmail: data.assistantsEmail,
        assistantsPhonenumber: data.assistantsPhonenumber,
        assistantsAddress: data.assistantsAddress,
        legalGuardianEmail: data.legalGuardianEmail,
        legalGuardianPhonenumber: data.legalGuardianPhonenumber,
        legalGuardianAddress: data.legalGuardianAddress,
        legalGuardianInstitute: data.legalGuardianInstitute,
        appealedDecision: data.appealedDecision,
        // TBD: attachments: ,
        //attachments: data.attachments,
        conclusionIsReady: data.conclusionIsReady,
        proceedingIsReady: data.proceedingIsReady,
        applicationForASummonsIsReady: data.applicationForASummonsIsReady,
        transcriptOfCriminalRecordIsReady: data.transcriptOfCriminalRecordIsReady,
        preliminaryInvestigationsAttachmentsAreReady: data.preliminaryInvestigationsAttachmentsAreReady,
        decisionOnDetentionIsReady: data.decisionOnDetentionIsReady,
        imprisonmentRequirementReady: data.imprisonmentRequirementReady
    })
    const savedForm = await admissionForm.save()
    console.log(savedForm.formId)
    res.json(savedForm.toJSON())

    Mailer.sendConfirmation(savedForm.formSender, savedForm.diaariNumber, savedForm.id)

})


admissionsRouter.post('/admission_form_attachment/:id', async (req, res) => {
    try {
        await uploadFile(req, res)
        console.log(req.file, req.file.buffer)
        Attachment.attachFile(req.params.id, req.file.originalname, req.file.buffer, req.body.whichFile)
        res.status(200).send({
            originalname: req.file.originalname,
            whichFile: req.body.whichFile,
            message: 'ok'
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err })
    }
})

module.exports = admissionsRouter
