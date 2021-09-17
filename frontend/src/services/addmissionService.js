import axios from 'axios'
const baseUrl = 'http://localhost:3001/'

const getAll = () => {
//    const request = axios.get(baseUrl)
    //  return request.then(response => response.data)
}

const create = personObject => {

    return axios.post(baseUrl, personObject)

}

export default { getAll, create }