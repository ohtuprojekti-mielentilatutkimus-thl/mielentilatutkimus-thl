import axios from 'axios'

//const baseUrl = process.env.NODE_ENV === 'prod' ? '/mielentilatutkimus/api/admissions' : '/api/admissions'
//const baseUrl = process.env.PUBLIC_URL + '/api/admissions'
const localRun = process.env.REACT_APP_LOCAL_RUN
const baseUrl = localRun ? '/api/admissions' : process.env.PUBLIC_URL + '/api/admissions'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = personObject => {
    return axios.post(baseUrl+'/admission_form', personObject)
}

const upload = (file, id) => {
    const formData = new FormData()
    console.log(file)
    formData.append('file', file)
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