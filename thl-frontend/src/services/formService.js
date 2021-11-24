import axios from 'axios'

const baseUrl = process.env.REACT_APP_LOCAL_RUN ? '/api/admissions' : process.env.PUBLIC_URL + '/api/admissions'

const getAccessToken = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken }
    }
    return {}
}

const getAll = () => {
    const request = axios.get(baseUrl, { headers: getAccessToken() })
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/thl/${id}`, newObject)
}

const askForInfo = (infoObject) => {

    return axios.post(`${baseUrl}/admission_form/request_additional_info/`, infoObject)
}

const updateResearchUnit = (id, newObject) => {
    return axios.put(`${baseUrl}/thl/${id}/research_unit`, newObject)
}

const getByResearchUnit = (researchUnit) => {
    return axios.get(`${baseUrl}/thl/research_unit/${researchUnit}`, researchUnit)
}

export default { getAll, update, askForInfo, updateResearchUnit, getByResearchUnit }
