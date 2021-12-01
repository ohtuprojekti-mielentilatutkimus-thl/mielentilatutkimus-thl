const Mailer = require('../services/mailer.js')
const HelperFunctions = require('../utils/helperFunctions.js')
const admissionsRouter = require('express').Router()
const admissionService = require('../services/admissionService')

//GET ALL ADMISSIONS
admissionsRouter.get('/', async (req, res) => {
    res.json(await admissionService.getAllAdmissions())
})

//GET ADMISSIONS BY RESEARCH UNIT
admissionsRouter.get('/thl/research_unit/:researchUnit', async (req, res) => {
    res.json(await admissionService.getAdmissionsByResearchUnit(req.params.researchUnit))
})

//GET SINGLE ADMISSION
admissionsRouter.get('/admission_form/:id', async (req, res) => {
    res.json(await admissionService.getAdmission(req.params.id))
})


//GET SIGNLE ADMISSION FOR EDITING
admissionsRouter.get('/admission_form/:id/edit', async (req,res) => {
    res.json(await admissionService.getAdmission(req.params.id))
})

// ?
admissionsRouter.post('/admission_form/request_additional_info', async (req, res) => {
    const data = req.body
    res.json(Mailer.requestAdditionalInfoFromSender(data.sender,data.id, data.additional_info))
})


//PUT ALL FIELDS
admissionsRouter.put('/admission_form/:id/edit', async (req, res) => {

    const data = req.body

    if (data.assistantsEmail!==undefined) {
        if (!HelperFunctions.validateAssistantsEmail(data)){
            res.sendStatus(500)
        }
    }
    if (data.legalGuardianEmail!==undefined) {
        if (!HelperFunctions.validateLegalGuardianEmailEmail(data)){
            res.sendStatus(500)
        }
    } 
    const updatedForm = await admissionService.updateAdmission(req.params.id, req.body)
    res.json(updatedForm.toJSON())
})

//PUT FORMSTATE
admissionsRouter.put('/thl/:id', async (req, res) => {
    const data = {
        formState: req.body.formState
    }

    const updatedForm = await admissionService.updateAdmission(req.params.id, data)

    res.json(updatedForm.toJSON()) 
})

//PUT RESEARCH_UNIT, RESEARCH_INFO, FORMSTATE
admissionsRouter.put('/thl/:id/research_unit', async (req, res) => {
    const data = {
        researchUnit: req.body.researchUnit, 
        researchUnitInformation: req.body.researchUnitInformation,
        formState: req.body.formState
    }
    const updatedForm = await admissionService.updateAdmission(req.params.id, data)

    res.json(updatedForm.toJSON()) 
})
   
module.exports = admissionsRouter
