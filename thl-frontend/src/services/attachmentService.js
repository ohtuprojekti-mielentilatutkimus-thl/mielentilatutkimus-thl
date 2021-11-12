import axios from 'axios'

const baseUrl = process.env.REACT_APP_LOCAL_RUN ? '/api/admissions' : process.env.PUBLIC_URL + '/api/admissions'


const getOne = ( id ) => {
    const request = axios.get(`${baseUrl}/admission_form_attachment/${id}`, { responseType: 'blob' })
    return request.then(response => response.data)
}

const upload = async (files, id, filesInfo) => {
    const formData = new FormData()

    formData.append('filesInfo', JSON.stringify(filesInfo))
    files.forEach(file => formData.append('files', file))

    const res = await axios.post(baseUrl+`/admission_form_attachment/${id}`, formData)
    return res.data
}

export default { getOne, upload }
