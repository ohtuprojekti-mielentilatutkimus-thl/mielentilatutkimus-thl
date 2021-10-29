import axios from 'axios'

const baseUrl = process.env.REACT_APP_LOCAL_RUN ? '/api/admissions' : process.env.PUBLIC_URL + '/api/admissions'


const getOne = ( id ) => {
    const request = axios.get(`${baseUrl}/admission_form_attachment/${id}`, { responseType: 'blob' })
    return request.then(response => response.data)
}

export default { getOne }
