import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API,
  withCredentials: true,
})

export default api
export { registerUser } from './userApi'
