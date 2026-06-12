import axios from 'axios'
import useAuthStore from '../store/authStore'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
})

api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest =
      error.config?.url?.includes('/auth/login')

    if (
      error.response?.status === 401 &&
      !isLoginRequest
    ) {
      useAuthStore.setState({
        token: null,
        user: null
      })

      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

export default api
