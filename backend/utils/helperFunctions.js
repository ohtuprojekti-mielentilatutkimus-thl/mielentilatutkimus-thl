const config = require('../utils/config')
const emailValidator = require('email-validator')

const emailOnListOfAllowedDomains = (email) => {
    const domain_part = email.split('@')[1]
    return config.ALLOWED_SENDER_EMAIL_DOMAIN.includes(domain_part)
}

const validateEmailAddress = (email) => {
    return emailValidator.validate(email) && emailOnListOfAllowedDomains(email)
}

const notEmpty = (string) => {
    if (!string || string === '') {
        return false
    }
    return true
}

const validateBasicInformationData = (basicInformationForm) => {
    return notEmpty(basicInformationForm.sendersEmail) && notEmpty(basicInformationForm.admissionNoteSender) &&
    notEmpty(basicInformationForm.sendersEmail) &&  notEmpty(basicInformationForm.sendersPhoneNumber) &&
    validateEmailAddress(basicInformationForm.sendersEmail)
}

const validateAdmissionFormData = (admissionForm) => {
    return validateEmailAddress(admissionForm.assistantsEmail) &&
    validateEmailAddress(admissionForm.legalGuardianEmail)
}

module.exports = {
    validateBasicInformationData,
    validateAdmissionFormData
}