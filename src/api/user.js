import request from '@/utils/request'
import backendUrl, { authorizedBackendUrl } from '@/utils/backendUrl'

const authentificationPath = 'auth/'

export function login(data) {
  localStorage.customer = data.customer
  localStorage.username = data.email
  console.log(localStorage.customer)

  return request({
    url: backendUrl + authentificationPath + 'login',
    method: 'post',
    data
  })
}

/**
 * gets a new token from the backend
 */
export function getRefreshToken() {
  return request({
    url: authorizedBackendUrl + 'refreshToken',
    method: 'get'
  })
}
/**
 * Gets the information from the backend
 * whether the user is already logged in
 */
 export function isLoggedIn() {
  return request({
    url: authorizedBackendUrl + 'isLoggedIn',
    method: 'get'
  })
}
/**
 * Request to the backend to remove the token from the cookie
 */
export function logOutAndRemoveCookie() {
  return request({
    url: authorizedBackendUrl + 'logOutAndRemoveCookie',
    method: 'get'
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

// export function logout() {
//   return request({
//     url: '/vue-element-admin/user/logout',
//     method: 'post'
//   })
// }
