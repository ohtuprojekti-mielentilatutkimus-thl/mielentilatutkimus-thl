<<<<<<< HEAD
import axios from 'axios'
const baseUrl = '/admission_form'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getAll }
=======
import axios from 'axios'
const baseUrl = '/admissions'


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getAll }
>>>>>>> a3292d60859567013bdafa1de2b71cd12dceb4a9
