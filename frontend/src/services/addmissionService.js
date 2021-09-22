import axios from 'axios'
const baseUrl = '/admission_form'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (props) => {

    const oldId = props.old_id
    const personObject = props.personObject

    //console.log('Servicesissä seuraavaksi axios.postilla lisätään lomake')
    return axios.post(baseUrl, personObject, oldId)
}
//EI TOIMI VIELÄ
const get_sender_data = async (  id  ) => {
    const request = await axios.get(`${baseUrl}/${id}`)
    return request.data
}

/*
const update = (props) => {

    const personObject = props.personObject
    const oldId = props. old_id

    return axios.post(baseUrl, personObject, oldId)
} */


export default { getAll, create , get_sender_data }