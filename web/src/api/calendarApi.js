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
  getAllComments(id) {
    const url = `event/${id}/comments`
    return axios.get(url)
  }
  saveComment(data) {
    const url = `/comment`
    return axios.post(url, data)
  }
}

const calendarApi = new CalendarApi()
export default calendarApi
