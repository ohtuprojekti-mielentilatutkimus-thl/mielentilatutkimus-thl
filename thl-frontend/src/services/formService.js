import axios from 'axios'
//const baseUrl = process.env.PUBLIC_URL + '/api/admissions'
const localRun = process.env.REACT_APP_LOCAL_RUN
const baseUrl = localRun ? '/api/admissions' : process.env.PUBLIC_URL + '/api/admissions'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/thl/${id}`, newObject)
}

export default { getAll, update }
