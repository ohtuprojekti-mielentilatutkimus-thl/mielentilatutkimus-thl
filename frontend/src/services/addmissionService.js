import axios from 'axios'

//const baseUrl = process.env.NODE_ENV === 'prod' ? '/mielentilatutkimus/api/admissions' : '/api/admissions'
const baseUrl = process.env.PUBLIC_URL + '/api/admissions'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = personObject => {
    return axios.post(baseUrl+'/admission_form', personObject)
}

/*
const update = (props) => {

    const personObject = props.personObject
    const oldId = props. old_id
    return axios.post(baseUrl, personObject, oldId)
} */


export default { getAll, create }