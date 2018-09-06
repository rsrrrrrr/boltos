import axios from 'axios'

const serverUrl = 'https://dev.boltos.io:3000/api'

export default function query(url, body = {}) {
    return axios.post(serverUrl + url, body)
}


// export default function getQuery(url, body = {}) {
//     return axios.get(serverUrl + url, body)
// }