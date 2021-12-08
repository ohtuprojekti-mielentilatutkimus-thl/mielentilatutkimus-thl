const Mailer = require('../services/mailer.js')
const admissionsRouter = require('express').Router()
const admissionService = require('../services/admissionService')
const users = require('../utils/users')

//GET ALL ADMISSIONS
admissionsRouter.get('/', async (req, res) => {
    if (!users.isFromTHL(req)) {
        return res.sendStatus(403)
    }
    res.json(await admissionService.getAllAdmissions())
})

//GET ADMISSIONS BY RESEARCH UNIT
admissionsRouter.get('/thl/research_unit/:researchUnit', async (req, res) => {
    if (!users.isFromResearchUnit(req, users.getRole(req)) && !users.isFromTHL(req)) {
        return res.sendStatus(403)
    }
    res.json(await admissionService.getAdmissionsByResearchUnit(req.params.researchUnit))
})

//GET SINGLE ADMISSION
admissionsRouter.get('/admission_form/:id', async (req, res) => {
    const admission = await admissionService.getAdmission(req.params.id, req.username, req.role)
    if (!users.isFromResearchUnit(req, admission.researchUnit) && !users.isFromTHL(req)) {
        return res.sendStatus(403)
    }
    res.json(admission)
})

// ?
admissionsRouter.post('/admission_form/request_additional_info', async (req, res) => {
    if (!users.isFromTHL(req)) {
        return res.sendStatus(403)
    }
    const data = req.body
    res.json(Mailer.requestAdditionalInfoFromSender(data.sender, data.id, data.additional_info))
})

//PUT FORMSTATE
admissionsRouter.put('/thl/:id', async (req, res) => {
    const data = {
        formState: req.body.formState
    }
    const updatedForm = await admissionService.updateAdmission(req.params.id, data, req.username, req.role)

    if (updatedForm.researchUnit !== users.getRole(req) && !users.isFromResearchUnit(req, users.getRole(req)) && !users.isFromTHL(req)) {
        return res.sendStatus(403)
    }
    res.json(updatedForm.toJSON()) 
})

//PUT STATEMENT
admissionsRouter.put('/thl/:id/add_statement', async (req, res) => {

    const data = {
        statement: req.body
    }
    const updatedForm = await admissionService.updateAdmission(req.params.id, data, req.username, req.role)
    if (updatedForm.researchUnit !== users.getRole(req) && !users.isFromResearchUnit(req, users.getRole(req))) {
        return res.sendStatus(403)
    }
    res.json(updatedForm.toJSON()) 
})

//PUT RESEARCH_UNIT, RESEARCH_INFO, FORMSTATE
admissionsRouter.put('/thl/:id/research_unit', async (req, res) => {
    const data = {
        researchUnit: req.body.researchUnit, 
        researchUnitInformation: req.body.researchUnitInformation,
        formState: req.body.formState
    }

    if (data.researchUnit !== users.isFromResearchUnit(req, users.getRole(req)) && !users.isFromTHL(req)) {
        return res.sendStatus(403)
    }

    const updatedForm = await admissionService.updateAdmission(req.params.id, data, req.username, req.role)

    res.json(updatedForm.toJSON()) 
})
   
module.exports = admissionsRouter