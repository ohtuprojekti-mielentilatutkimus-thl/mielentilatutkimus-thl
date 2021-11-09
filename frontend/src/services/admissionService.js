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

const upload = (files, id, whichFile, filesInfo) => {
    const formData = new FormData()

    console.log('logataan filet adServicessä ', files)

    formData.append('file', files)
    formData.append('whichFile', whichFile)

    formData.append('filesInfo', filesInfo)

    //formData.append('fieldname', 'testFieldName')
    filesInfo.forEach(fileInfo => console.log(fileInfo))
    /*
    const res = axios.post(baseUrl+`/admission_form_attachment/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
    return res.data
    */
    return 'asd'
}

export default { getAll, create, update, get, upload }