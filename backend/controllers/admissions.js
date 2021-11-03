const Mailer = require('../services/mailer.js')
const Attachment = require('../services/attachment.js')
const config = require('../utils/config')
const uploadFile = require('../utils/upload.js')

const admissionsRouter = require('express').Router()

const FileHandler = require('../services/fileHandler')

const AdmissionForm = require('../models/admissionForm.model.js')
const AttachmentForm = require('../models/attachmentForm.model')
const BasicInformationForm = require('../models/basicInformationForm.model.js')
const path = require('path')
const emailValidator = require('email-validator')

admissionsRouter.get('/', async (req, res) => {
    const admissionForms = await AdmissionForm.find({}).populate('attachments', { fileName: 1, whichFile: 1 })
    res.json(admissionForms.map((admissionform) => admissionform.toJSON()))
})
  
admissionsRouter.get('/basic_information/:id', async (req, res) => {
    const data = await BasicInformationForm.find({}).catch((err) => {console.log(err)})
    res.json(data.filter(d => d.id === req.params.id).map(data => data.toJSON()))
})

const emailOnListOfAllowedDomains = (email) => {
    const domain_part = email.split('@')[1]
    return config.ALLOWED_SENDER_EMAIL_DOMAIN.includes(domain_part)
}

const validateBasicInformationData = (basicInformationForm) => {
    return emailValidator.validate(basicInformationForm.sendersEmail) && emailOnListOfAllowedDomains(basicInformationForm.sendersEmail)
}

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

    if (!validateBasicInformationData(basicInformationForm)) {
        res.sendStatus(400)
    } else {
        const savedForm = await basicInformationForm.save()
        const response = [
            savedForm.admissionNoteSenderOrganization,
            savedForm.admissionNoteSender,
            savedForm.sendersEmail,
            savedForm.sendersPhoneNumber
        ]
        res.json(response)
        Mailer.sendLinkToAdmissionForm(savedForm.sendersEmail, savedForm.id)
    }
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
        admissionNoteSenderOrganization : data.admissionNoteSenderOrganization,
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

const validateAdmissionFormData = (admissionForm) => {
    return emailValidator.validate(admissionForm.assistantsEmail) &&
    emailValidator.validate(admissionForm.legalGuardianEmail)
}


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
        admissionNoteSenderOrganization : data.admissionNoteSenderOrganization,
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

    if (!validateAdmissionFormData(admissionForm)) {
        res.sendStatus(500)
    } else {
        const savedForm = await admissionForm.save()
        res.json(savedForm.toJSON())
        Mailer.sendConfirmation(savedForm.formSender, savedForm.diaariNumber, savedForm.id)
    }
})

admissionsRouter.get('/admission_form/:id', async (req, res) => {
    const data = await AdmissionForm.find({}).catch((err) => {console.log(err)})
    res.json(data.filter(d => d.id === req.params.id).map(data => data.toJSON()))
})

admissionsRouter.post('/admission_form/request_additional_info', async (req) => {
    const data = req.body
    Mailer.requestAdditionalInfoFromSender(data.sender,data.id, data.additional_info)
})

admissionsRouter.get('/admission_form/:id/edit', async (req,res) => {
    const data = await AdmissionForm.findById(req.params.id).catch((err) => {console.log(err)})
        .then(data => {
            res.json(data.toJSON())
        })
    console.log(data)

})

admissionsRouter.put('/admission_form/:id/edit', async (req, res) => {

    const data = req.body

    var forms = await AdmissionForm.find({}).catch((err) => {console.log(err)})
    var form = forms.filter(d => d.id === req.params.id).map(f => f.toJSON())

    // console.log('muokatut tiedot: ', data)

    for (let i = 0; i < Object.keys(data).length; i++) { 

        var key = Object.keys(data)[i]
        var value = Object.values(data)[i]
        form = { ...form, [key]: value }
    } 
 
    AdmissionForm.findByIdAndUpdate(req.params.id, form, {new: true})
        .then(updatedForm => {
            res.json(updatedForm.toJSON())
        })
})

admissionsRouter.get('/admission_form_attachment/:attachmentId', async (req, res) => {
    const attachmentFile = await AttachmentForm.findById(req.params.attachmentId).catch((err) => {console.log(err)})

    const fileBuffer = Buffer.from(attachmentFile.fileData)

    // currently assumed that all files are pdf, different file types might require other handling
    await FileHandler.bufferToPdf(fileBuffer, attachmentFile.fileName)
    res.sendFile(path.resolve('./tmp', attachmentFile.fileName), function (err) {
        if (err) {
            console.log('Error sending file')
        }
        FileHandler.deleteTmpFile(attachmentFile.fileName)
    })
})

admissionsRouter.post('/admission_form_attachment/:id', async (req, res) => {
    try {
        await uploadFile(req, res)
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
