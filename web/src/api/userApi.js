import axios from '@/lib/axios'

class UserApi {
  getAllUserNotMe = id => {
    const url = `user/${id}/not-me`
    return axios.get(url)
  }
}

const userApi = new UserApi()
export default userApi
