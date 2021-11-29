// import axios from 'axios'

import axios from 'axios'

const baseUrl = process.env.REACT_APP_LOCAL_RUN ? '/api/auth' : process.env.PUBLIC_URL + '/api/auth'

const login = loggedInUser => {

    console.log(loggedInUser)
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

    console.log('lol1')
    console.log(JSON.parse(localStorage.getItem('user')))
    console.log('lol2')

    return JSON.parse(localStorage.getItem('user'))
}

export default { login: login, logout: logout, getUser: getUser }