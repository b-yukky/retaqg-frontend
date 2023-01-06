import TokenService from '@/services/tokenService.js'
import api from '@axios'

class AuthService {
  login(user) {
    return api
      .post('auth/login/', {
        username: user.username,
        password: user.password
      })
      .then((response) => {
        if (response.data.access) {
          TokenService.setUser(response.data)
        }

        return response.data
      })
  }

  loginNoPassword(uuid) {
    return api
      .post('auth/login/nopassword/', {
        username: uuid,
      })
      .then((response) => {
        if (response.data.access) {
          TokenService.setUser(response.data)
        }

        return response.data
      })
  }

  logout() {
    TokenService.removeUser()
  }

  register(user) {
    return api.post('auth/register/', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

}

export default new AuthService()
