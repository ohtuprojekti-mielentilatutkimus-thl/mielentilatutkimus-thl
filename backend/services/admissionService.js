const AdmissionForm = require('../models/admissionForm.model.js')
const IdSerializer = require('./idSerializer')

const getAllAdmissions = async () => {
    const admissionForms = await AdmissionForm.find({}).select('thlRequestId formState createdAt updatedAt')
    /* tarvitseeko tähän lokitusta? 
    admissionForms.log({
        action: 'get_admission_form',
        category: 'admission_form',
        createdBy: 'userWouldGoHere',
        message: '(all) admission forms were requested'
    })
    */
    return admissionForms.map((admissionform) => admissionform.toJSON())
}

const saveAdmission = async (data) => {
    const form = new AdmissionForm(
        { ...data }
    )
    const prevAdmission = await AdmissionForm.findOne().sort({ createdAt: 'descending' })
    const prevId = prevAdmission == null ? -1 : prevAdmission.thlRequestId

    form.thlRequestId = IdSerializer.getNextThlRequestId(prevId)

    await form.save()

    form.log({
        action: 'save_admission_form',
        category: 'admission_form',
        createdBy: 'userWouldGoHere',
        message: 'Tutkimuspyyntö tallennettu',
    })

    return form
}

const getAdmission = async (id) => {
    const form = await AdmissionForm.findById(id).populate('attachments', { fileName: 1, whichFile: 1 })

    form.log({
        action: 'get_admission_form',
        category: 'admission_form',
        createdBy: 'userWouldGoHere',
        message: 'Tutkimuspyyntö avattu'
    })
    return form.toJSON()
}

const getAdmissionsByResearchUnit = async (researchUnit) => {

    const forms = await AdmissionForm.find({researchUnit: (researchUnit)}).populate('attachments', { fileName: 1, whichFile: 1 })

    /*forms.log({
        action: 'get_admission_form',
        category: 'admission_form',
        createdBy: 'userWouldGoHere',
        message: `admissions where research unit is '${researchUnit}' was requested`
    }) */

    return forms.map((admissionform) => admissionform.toJSON())
}

const updateAdmission = async (id, data) => {

    const form = await AdmissionForm.findById(id).populate('attachments', { fileName: 1, whichFile: 1 })
   
    for (var [key, value] of Object.entries(data)) {
        form[key] = value
    }

    await form.save()

    form.log({
        action: 'update_admission_form',
        category: 'admission_form',
        createdBy: 'userWouldGoHere',
        message: 'Tutkimuspyyntö päivitetty',
    })

    return form

}

module.exports = { getAllAdmissions, getAdmission, saveAdmission, updateAdmission, getAdmissionsByResearchUnit }