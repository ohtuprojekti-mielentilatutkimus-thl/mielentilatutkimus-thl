const config = require('../utils/config')
const emailValidator = require('email-validator')

const emailOnListOfAllowedDomains = (email) => {
    const domain_part = email.split('@')[1]
    return config.ALLOWED_SENDER_EMAIL_DOMAIN.includes(domain_part)
}

const validateEmailAddress = (email) => {
    return emailValidator.validate(email) && emailOnListOfAllowedDomains(email)
}

const validateBasicInformationData = (basicInformationForm) => {
    return validateEmailAddress(basicInformationForm.sendersEmail)
}

const validateAdmissionFormData = (admissionForm) => {
    return emailValidator.validate(admissionForm.formSender) &&
    emailValidator.validate(admissionForm.assistantsEmail) &&
    emailValidator.validate(admissionForm.legalGuardianEmail)
}

const emailFromPoliceOnListOfAllowedDomain = (email) => {
    const domain_part = email.split('@')[1]
    return config.ALLOWED_SENDER_EMAIL_DOMAIN_POLICE.includes(domain_part)
}

const validatePoliceEmailAddress = (email) => {
    return emailValidator.validate(email) && emailFromPoliceOnListOfAllowedDomain(email)
}

module.exports = {
    validateBasicInformationData,
    validateAdmissionFormData,
    validatePoliceEmailAddress
}