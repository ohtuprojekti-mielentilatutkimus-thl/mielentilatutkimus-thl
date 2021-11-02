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

const upload = (file, id, whichFile) => {
    console.log(id)
    const formData = new FormData()
    console.log(file)
    formData.append('file', file)
    formData.append('whichFile', whichFile)
    const res = axios.post(baseUrl+`/admission_form_attachment/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    return res.data
}

export default { getAll, create, update, get, upload }