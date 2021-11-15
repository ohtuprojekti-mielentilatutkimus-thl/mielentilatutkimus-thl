// import axios from 'axios'

// const baseUrl = process.env.REACT_APP_LOCAL_RUN ? '/api/admissions' : process.env.PUBLIC_URL + '/api/admissions'

const create = loggedInUser => {

    console.log(loggedInUser)
    // return axios.post(`${baseUrl}/thl/loggedInUser`, loggedInUser)
}

export default { create }