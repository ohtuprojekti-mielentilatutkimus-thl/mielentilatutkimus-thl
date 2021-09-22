import axios from 'axios'
const baseUrl = '/'

const create = (basicInformationObject) => {

    return axios.post(baseUrl, basicInformationObject)
}

export default { create }