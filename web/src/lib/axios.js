import Axios from 'axios'
import { logOut } from '@/utils/auth'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'content-type': 'application/json',
    },
    withCredentials: true,
})

axios.interceptors.response.use(response => response, error => {
    if (error.response.status === 401) {
        logOut()

        return Promise.reject()
    }

    return Promise.reject(error)
})

export default axios
