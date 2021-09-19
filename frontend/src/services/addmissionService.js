import axios from 'axios'
const baseUrl = '/'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = personObject => {
    console.log('admissionserviceen asti päästy')

    return axios.post(baseUrl, personObject)

}

export default { getAll, create }