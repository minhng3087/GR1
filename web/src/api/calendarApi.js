import axios from '@/lib/axios'

class CalendarApi {
    getAll = () => {
        const url = 'events'
        return axios.get(url)
    }
    getDetailEvent(id) {
        const url = `events/${id}/`
        return axios.get(url)
    }
    addEvent(data) {
        const url = 'events/'
        return axios.post(url, data)
    }
    updateEvent(id, data) {
        const url = `events/${id}`
        return axios.put(url, data)
    }
    removeEvent(id) {
        const url = `events/${id}`
        return axios.delete(url)
    }
    getEventsByUser(id) {
        const url = `user/${id}/events`
        return axios.get(url)
    }
    getEventsByUserOrder(id) {
        const url = `user/${id}/events-order`
        return axios.get(url)
    }
}

const calendarApi = new CalendarApi()
export default calendarApi
