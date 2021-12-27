import axios from 'axios'
import utils from './utils.js'

const baseUrl = process.env.REACT_APP_LOCAL_RUN ? '/api/thl/admissions' : process.env.PUBLIC_URL + '/api/thl/admissions'

const getAll = () => {
    const request = axios.get(baseUrl, { headers: utils.getAccessToken() })
    return request.then(response => response.data)
}

const getOne = ( id ) => {
    const request = axios.get(`${baseUrl}/admission_form/${id}`, { headers: utils.getAccessToken() })
    return request.then(response => response.data )
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/thl/${id}`, newObject, { headers: utils.getAccessToken() })
}

const askForInfo = (infoObject) => {

    return axios.post(`${baseUrl}/admission_form/request_additional_info/`, infoObject, { headers: utils.getAccessToken() })
}

const updateResearchUnit = (id, newObject) => {
    return axios.put(`${baseUrl}/thl/${id}/research_unit`, newObject, { headers: utils.getAccessToken() })
}

const getByResearchUnit = (researchUnit) => {
    const request = axios.get(`${baseUrl}/thl/research_unit/${researchUnit}`, { headers: utils.getAccessToken() })
    return request.then(response => response.data)
}

const addStatement = (id, statement) => {
    return axios.put(`${baseUrl}/thl/${id}/add_statement`, statement, { headers: utils.getAccessToken() })
}

const addStatementDraft = (id, statement_draft) => {
    return axios.put(`${baseUrl}/thl/${id}/add_statement_draft`, statement_draft,{ headers: utils.getAccessToken() })
}

export default { getAll, getOne, update, askForInfo, updateResearchUnit, getByResearchUnit, addStatement, addStatementDraft }
