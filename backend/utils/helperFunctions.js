const config = require('../utils/config')
const emailValidator = require('email-validator')

const emailOnListOfAllowedDomains = (email) => {
    const domain_part = email.split('@')[1]
    return config.ALLOWED_SENDER_EMAIL_DOMAIN.includes(domain_part)
}

const validateBasicInformationData = (basicInformationForm) => {
    return emailValidator.validate(basicInformationForm.sendersEmail) && emailOnListOfAllowedDomains(basicInformationForm.sendersEmail)
}

module.exports = {
    validateBasicInformationData
}