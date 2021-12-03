import axios from 'axios'

const baseUrl = process.env.REACT_APP_LOCAL_RUN ? '/api/admissions' : process.env.PUBLIC_URL + '/api/admissions'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = personObject => {
    return axios.post(baseUrl+'/admission_form', personObject)
}

const update = (id, personObject) => {

    return axios.put(`${baseUrl}/admission_form/${id}/edit`, personObject)
}

const get = async (  id  ) => {

    const request = await axios.get(`${baseUrl}/admission_form/${id}`)

    return request.data
}

const getForEdit = async (  id  ) => {
    const request = await axios.get(`${baseUrl}/admission_form/${id}/edit`)
    return request.data
}


const upload = async (files, id, filesInfo) => {
    const formData = new FormData()

    formData.append('filesInfo', JSON.stringify(filesInfo))
    files.forEach(file => formData.append('files', file))

    return await axios.post(baseUrl+`/admission_form_attachment/${id}`, formData)
}

export default { getAll, create, update, get, getForEdit, upload }