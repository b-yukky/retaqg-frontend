import AuthService from '@/services/auth.service'
import TokenService from '@/services/tokenService'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {

  const user = ref(TokenService.getUser())

  const status = ref(user ? { loggedIn: true } : { loggedIn: false})

  function login(userData: any) {
    return AuthService.login(userData)
      .then((response) => {
        user.value = TokenService.getUser()
        status.value.loggedIn = true
        return Promise.resolve(user)
    }).catch( error => { 
        return Promise.reject(error)
    })
  }
  
  function logout() {
    AuthService.logout()
    user.value = TokenService.getUser()
    status.value.loggedIn = false
  }

  function refreshAccessToken(accessToken: string) {
    TokenService.updateLocalAccessToken(accessToken)
    user.value = TokenService.getUser()
    status.value.loggedIn = true
  }


  return { user, status, login, logout, refreshAccessToken }
})
