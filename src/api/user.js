import request from '@/utils/request'
import backendUrl, { authorizedBackendUrl } from '@/utils/backendUrl'

const authentificationPath = 'auth/'

export function login(data) {
  localStorage.customer = data.customer
  localStorage.username = data.email

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
 * whether the user is already logged in.
 * The autorized backend url is used here
 * which allow us to use the logic of the tokenMiddleware in the backend.
 * if the user was not logged in, an error comes from tokenMiddleware.
 * @returns {true}, if the user was logged in
 * @throws {Error}, if the user was not logged in.
 */
 export function isLoggedIn() {
  return request({
    url: authorizedBackendUrl + 'isLoggedIn',
    method: 'get'
  })
}
/**
 * Request to the backend to remove the token from the cookie
 * Note that you can see the following warning in the console in browser:
 * "Das Cookie "token" wurde abgelehnt, da es bereits abgelaufen ist."
 * This happens because in order to delete the token in the cookie, the expiration date has to be in the past.
 * @see https://stackoverflow.com/questions/5285940/correct-way-to-delete-cookies-server-side
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

