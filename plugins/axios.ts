import JwtService from '@/core/services/JwtService';
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL?.toString()
  axios.defaults.headers.common['Accept'] = 'application/json'

  if (JwtService.getToken()) {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${JwtService.getToken()}`
  }

  // Handle 401
  axios.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      if (401 === error.response.status) {
        useAuthStore().purgeAuth()
        // navigateTo('/auth/login')
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 1000);
        return Promise.reject(error)
      } else {
        return Promise.reject(error)
      }
    }
  )
})
