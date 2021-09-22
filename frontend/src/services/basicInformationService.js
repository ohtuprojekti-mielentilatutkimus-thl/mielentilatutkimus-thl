import axios from 'axios'
const baseUrl = '/basic_information_form'

const create = basicInformationObject => {
    return axios.post(baseUrl, basicInformationObject)
}

const get = async (  id  ) => {
    const request = await axios.get(`${baseUrl}/${id}`)
    return request.data
}

export default { create, get }