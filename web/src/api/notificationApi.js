import axios from '@/lib/axios'

class NotificationApi {
    getAll = id => {
        const url = `user/${id}/notifications`
        return axios.get(url)
    }
}

const notificationApi = new NotificationApi()
export default notificationApi
