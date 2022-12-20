import AuthService from '@/services/auth.service'
import TokenService from '@/services/tokenService'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(TokenService.getUser())
    const status = ref(user ? { loggedIn: true } : { loggedIn: false})

    const accessToken = computed(() => user.value.access)
    const refreshToken = computed(() => user.value.refresh)

    function login(user: any) {
      return AuthService.login(user)
        .then((userData) => {
          user.value = userData
          status.value.loggedIn = true
          return Promise.resolve(user)
      }).catch( error => { 
          return Promise.reject(error)
      })
    }
    
    function logout() {
      AuthService.logout()
      user.value = null
      status.value.loggedIn = false
    }

    function refreshAccessToken(accessToken: string) {
      TokenService.updateLocalAccessToken(accessToken)
      user.value.access = accessToken
      status.value.loggedIn = true
    }

  return { user, status, accessToken, refreshToken, login, logout, refreshAccessToken }
})
