const Mailer = require('../services/mailer.js')
const HelperFunctions = require('../utils/helperFunctions.js')
const admissionsRouter = require('express').Router()
const IdSerializer = require('../services/idSerializer')
const AdmissionForm = require('../models/admissionForm.model.js')


admissionsRouter.get('/', async (req, res) => {
    const admissionForms = await AdmissionForm.find({}).populate('attachments', { fileName: 1, whichFile: 1 })
    res.json(admissionForms.map((admissionform) => admissionform.toJSON()))
})
  
admissionsRouter.post('/admission_form', async (req, res) => {
    const data = req.body

    const admissionForm = new AdmissionForm(
        { ...data }
    )

    if (!HelperFunctions.validateAdmissionFormData(admissionForm)) {
        res.sendStatus(500)
    } else {
        const prevAdmission = await AdmissionForm.findOne().sort({ createdAt: 'descending' })
        const prevId = prevAdmission == null ? -1 : prevAdmission.thlRequestId
    
        admissionForm.thlRequestId = IdSerializer.getNextThlRequestId(prevId)

        const savedForm = await admissionForm.save()
        res.json(savedForm.toJSON())
        Mailer.sendConfirmation(savedForm.formSender, savedForm.diaariNumber, savedForm.id)
    }
})

admissionsRouter.get('/admission_form/:id', async (req, res) => {
    const data = await AdmissionForm.find({}).catch((err) => {console.log(err)})
    res.json(data.filter(d => d.id === req.params.id).map(data => data.toJSON()))
})


admissionsRouter.post('/admission_form/request_additional_info', async (req, res) => {
    const data = req.body
    res.json(Mailer.requestAdditionalInfoFromSender(data.sender,data.id, data.additional_info))
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
        conclusionIsReady: data.conclusionIsReady,
        proceedingIsReady: data.proceedingIsReady,
        applicationForASummonsIsReady: data.applicationForASummonsIsReady,
        transcriptOfCriminalRecordIsReady: data.transcriptOfCriminalRecordIsReady,
        preliminaryInvestigationsAttachmentsAreReady: data.preliminaryInvestigationsAttachmentsAreReady,
        decisionOnDetentionIsReady: data.decisionOnDetentionIsReady,
        imprisonmentRequirementReady: data.imprisonmentRequirementReady
    }

    AdmissionForm.findByIdAndUpdate(req.params.id, form, {new: true})
        .populate('attachments', { fileName: 1, whichFile: 1 })
        .then(updatedForm => {
            res.json(updatedForm.toJSON())
        }) 
})

admissionsRouter.put('/thl/:id/research_unit', async (req, res) => {
    const data = req.body

    const updatedForm = await AdmissionForm.findByIdAndUpdate(req.params.id, {
        researchUnit: data.researchUnit, 
        researchUnitInformation: data.researchUnitInformation,
        formState: data.formState
    }, {new: true})
        .populate('attachments', { fileName: 1, whichFile: 1 })
    
    return res.json(updatedForm.toJSON())
        
})
   
module.exports = admissionsRouter
