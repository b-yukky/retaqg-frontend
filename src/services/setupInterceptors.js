import TokenService from '@/services/tokenService'
import axiosInstance from '@axios'

const setup = () => {
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
      console.log('error... orig config', originalConfig)

      if (originalConfig.url !== 'auth/login/' && err.response) {
        // Access Token was expired

        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true

          try {
            const rs = await axiosInstance.post('auth/token/refresh/', {
              refresh: TokenService.getLocalRefreshToken()
            })

            const { accessToken } = rs.data

            TokenService.updateLocalAccessToken(accessToken)

            return axiosInstance(originalConfig)

          } catch (_error) {

            TokenService.removeUser()

            return Promise.reject(_error)
          }
        }
      }

      return Promise.reject(err)
    }
  )
}

export default setup
