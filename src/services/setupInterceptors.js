import TokenService from '@/services/tokenService'
import axiosInstance from '@axios'

const setup = (authStore) => {

  axiosInstance.interceptors.request.use(
    (config) => {

      const token = TokenService.getLocalAccessToken()
      
      if (token) {
        // config.headers["Authorization"] = 'Bearer ' + token  // for Spring Boot back-end
        // config.headers["x-access-token"] = token // for Node.js Express back-end
        config.headers['Authorization'] = 'JWT ' + token
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  axiosInstance.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {

      const originalConfig = err.config

      if (originalConfig.url !== 'auth/login/' && err.response) {
        // Access Token was expired

        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true
          try {
            const rs = await axiosInstance.post('auth/token/refresh/', {
              refresh: TokenService.getLocalRefreshToken()
            })

            console.log('trying to refresh', rs)

            const accessToken = rs.data.access

            authStore.refreshAccessToken(accessToken)

            return axiosInstance(originalConfig)

          } catch (_error) {

            authStore.logout()

            return Promise.reject(_error)
          }
        }
      }

      return Promise.reject(err)
    }
  )
}

export default setup
