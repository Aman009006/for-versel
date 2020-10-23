import request from '@/utils/request'
import backendUrl, { authorizedBackendUrl } from '@/utils/backendUrl'

const authentificationPath = 'auth/'

export function login(data) {
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

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
