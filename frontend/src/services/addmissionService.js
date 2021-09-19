import axios from 'axios'
const baseUrl = '/'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = personObject => {
    console.log('Servicesissä seuraavaksi axios.postilla lisätään lomake')

    return axios.post(baseUrl, personObject)

}

export default { getAll, create }