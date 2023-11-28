import request from '@/utils/request'
import { authorizedBackendUrl } from '@/utils/backendUrl'

export function getAllUsers() {
  return request({
    url: authorizedBackendUrl + 'users',
    method: 'get',
  })
}

export function addUser(data) {
  return request({
    url: authorizedBackendUrl + 'users',
    method: 'post',
    data
  })
}

export function editUser(data) {
  return request({
    url: authorizedBackendUrl + 'users',
    method: 'put',
    data
  })
}
export function deleteUser (email) {
  return request({
    url: authorizedBackendUrl + 'users',
    method: 'delete',
    data: {
      email: email
    }
  })
}

export function deleteRole (role) {
  return request({
    url: authorizedBackendUrl + 'users',
    method: 'delete',
    data: {
      role: role
    }
  })
}
