const Mailer = require('../services/mailer.js')
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
    res.json(await admissionService.getAdmission(req.params.id, req.user))
})

// ?
admissionsRouter.post('/admission_form/request_additional_info', async (req, res) => {
    const data = req.body
    res.json(Mailer.requestAdditionalInfoFromSender(data.sender, data.id, data.additional_info))
})

//PUT FORMSTATE
admissionsRouter.put('/thl/:id', async (req, res) => {
    const data = {
        formState: req.body.formState
    }

    const updatedForm = await admissionService.updateAdmission(req.params.id, data, req.user)

    res.json(updatedForm.toJSON()) 
})

//PUT RESEARCH_UNIT, RESEARCH_INFO, FORMSTATE
admissionsRouter.put('/thl/:id/research_unit', async (req, res) => {
    const data = {
        researchUnit: req.body.researchUnit, 
        researchUnitInformation: req.body.researchUnitInformation,
        formState: req.body.formState
    }
    const updatedForm = await admissionService.updateAdmission(req.params.id, data, req.user)

    res.json(updatedForm.toJSON()) 
})
   
module.exports = admissionsRouter
