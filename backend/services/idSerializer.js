const getNextThlRequestId = prevId => {
    let currYear = new Date().getFullYear().toString()
    let descriptorAndYear = 'THL_OIKPSYK_' + currYear + '-' 

    if (!prevId || prevId === -1) {
        return descriptorAndYear + 1
    }

    let idNumberOfPrevRequest = extractIdNum(prevId)
    let yearOfPrevRequest = extractYear(prevId)

    return descriptorAndYear + (yearOfPrevRequest === currYear ? (idNumberOfPrevRequest + 1) : 1)
}

const extractYear = prevId => prevId.substring(12, 16)
const extractIdNum = prevId => parseInt(prevId.split('-')[1])

module.exports = { getNextThlRequestId }