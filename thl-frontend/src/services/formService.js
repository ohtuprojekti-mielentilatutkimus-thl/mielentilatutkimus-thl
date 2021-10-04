import axios from 'axios'
const baseUrl = process.env.PUBLIC_URL + '/api/admissions'


const getAll = () => {
    const request = axios.get(baseUrl)
    console.log('servicessä')
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/thl/${id}`, newObject)
}

export default { getAll, update }
