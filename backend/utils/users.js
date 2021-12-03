const getUsername = (req) => {
    return req.username
}

const getRole = (req) => {
    return req.role
}

const isFromTHL = (req) => {
    if (getRole(req) === 'THL') {
        return true
    }
    return false
}
const isFromResearchUnit = (req, unit) => {
    if (getRole(req) === unit) {
        return true
    }
    return false
}
module.exports = {
    getUsername, getRole, isFromTHL, isFromResearchUnit
}