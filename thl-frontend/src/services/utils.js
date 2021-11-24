const getAccessToken = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.accessToken) {
        return { 'X-Access-Token': user.accessToken }
    }
    return {}
}

export default ({ getAccessToken: getAccessToken })