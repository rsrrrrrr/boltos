import axios from 'axios'

// const serverUrl = 'https://dev.boltos.io:3000/api';
const serverUrl = 'http://localhost:3000/api';

// export default function getServerUrl() {
//     return serverUrl;
// }

export default function query(url, body = {}) {
    return axios.post(serverUrl + url, body)
}


// export default function getQuery(url, body = {}) {
//     return axios.get(serverUrl + url, body)
// }