// import axios from 'axios'

import axios from 'axios'

const baseUrl = process.env.REACT_APP_LOCAL_RUN ? '/api/thl/auth' : process.env.PUBLIC_URL + '/api/thl/auth'

const login = loggedInUser => {

    return axios.post(`${baseUrl}/login`, loggedInUser).then(res => {
        if(res.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(res.data))
        }
        return res.data
    })
}

const logout = () => {
    localStorage.removeItem('user')
}

const getUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

export default { login: login, logout: logout, getUser: getUser }