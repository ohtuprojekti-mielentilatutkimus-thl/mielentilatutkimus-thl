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
        message: 'admission form was saved',
        form_id: form.id
    })

    return form
}

const getAdmission = async (id) => {
    const form = await AdmissionForm.findById(id).populate('attachments', { fileName: 1, whichFile: 1 })

    form.log({
        action: 'get_admission_form',
        category: 'admission_form',
        createdBy: 'userWouldGoHere',
        message: 'admission form was requested',
        form_id: form.id
    })
    return form.toJSON()
}

const updateAdmission = async (id, data) => {

    const form = await AdmissionForm.findById(id).populate('attachments', { fileName: 1, whichFile: 1 })
   
    for (var [key, value] of Object.entries(data)) {
        form[key] = value
    }

    //saattaa tarvita joskus
    //const form = { ...data }
    //delete form['attachments']

    await form.save()

    form.log({
        action: 'update_admission_form',
        category: 'admission_form',
        createdBy: 'userWouldGoHere',
        message: 'admission form was updated',
        form_id: form.id
    })

    return form

}

module.exports = { getAllAdmissions, getAdmission, saveAdmission, updateAdmission }