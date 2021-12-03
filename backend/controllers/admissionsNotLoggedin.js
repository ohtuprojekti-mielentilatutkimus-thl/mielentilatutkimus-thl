const Mailer = require('../services/mailer.js')
const HelperFunctions = require('../utils/helperFunctions.js')
const sendAdmissionsRouter = require('express').Router()
const admissionService = require('../services/admissionService')
  
//POST ADMISSION
sendAdmissionsRouter.post('/admission_form', async (req, res) => {
    const data = req.body

    if (!HelperFunctions.validateAdmissionFormData(data)) {
        res.sendStatus(500)
    } 
    if (data.assistantsEmail.length>0 && !HelperFunctions.validateAssistantsEmail(data) || 
    (data.legalGuardianEmail.length>0 && !HelperFunctions.validateLegalGuardianEmailEmail(data))) {
        res.sendStatus(500)

    } else {
        const savedForm = await admissionService.saveAdmission(data)
        Mailer.sendConfirmation(savedForm.formSender, savedForm.diaariNumber, savedForm.id)

        //Tarviiko lähettää takaisin tallennettua lomaketta?
        res.json(savedForm)
    }
})

//GET SIGNLE ADMISSION FOR EDITING
sendAdmissionsRouter.get('/admission_form/:id/edit', async (req,res) => {
    res.json(await admissionService.getAdmissionForEdit(req.params.id))
})


//PUT ALL FIELDS
sendAdmissionsRouter.put('/admission_form/:id/edit', async (req, res) => {

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
    //Change this
    res.json(updatedForm.toJSON())
})
   
module.exports = sendAdmissionsRouter
