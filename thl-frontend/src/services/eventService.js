import axios from 'axios'

const baseUrl = process.env.REACT_APP_LOCAL_RUN ? '/api/thl/log' : process.env.PUBLIC_URL + '/api/thl/log'

const getEventsById = (id) => {
    const request = axios.get(`${baseUrl}/form_event/${id}` )
    return request.then(response => response.data)

}

export default { getEventsById }
