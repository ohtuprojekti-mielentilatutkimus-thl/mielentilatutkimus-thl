import axios from 'axios'

const baseUrl = process.env.REACT_APP_LOCAL_RUN ? '/api/admissions/upload_form' : process.env.PUBLIC_URL + '/api/admissions'

const askForAddingAttachmentLink = (infoObject) => {

    return axios.post(baseUrl, infoObject)
}

export default { askForAddingAttachmentLink }