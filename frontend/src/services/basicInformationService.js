import axios from 'axios'
const baseUrl = '/basic_information'

const create = basicInformationObject => {

    return axios.post(`${baseUrl}_form`, basicInformationObject)
}

const get = async (  id  ) => {

    const request = await axios.get(`${baseUrl}/${id}`)
    return request.data
}

export default { create, get }