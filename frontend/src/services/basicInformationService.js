import axios from 'axios'

const baseUrl = process.env.REACT_APP_LOCAL_RUN ? '/api/admissions/basic_information' : process.env.PUBLIC_URL + '/api/admissions/basic_information'

const create = basicInformationObject => {

    return axios.post(`${baseUrl}_form`, basicInformationObject)
}

const get = async (  id  ) => {

    const request = await axios.get(`${baseUrl}/${id}`)
    return request.data
}

export default { create, get }