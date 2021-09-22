import axios from 'axios'
const baseUrl = '/admission_form'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getAll }
