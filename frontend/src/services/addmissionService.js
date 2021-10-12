import axios from 'axios'

const baseUrl = process.env.REACT_APP_LOCAL_RUN ? '/api/admissions' : process.env.PUBLIC_URL + '/api/admissions'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = personObject => {
    return axios.post(baseUrl+'/admission_form', personObject)
}

const upload = (file, id, whichFile) => {
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
/*
const update = (props) => {

    const personObject = props.personObject
    const oldId = props. old_id
    return axios.post(baseUrl, personObject, oldId)
} */


export default { getAll, create, upload }