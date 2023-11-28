import request from '@/utils/request'
import {authorizedBackendUrl} from "@/utils/backendUrl";

export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get',
  })
}

export function getRoles() {
  return request({
    url: '/vue-element-admin/roles',
    method: 'get',
  })
}

export function addRole(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data,
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data,
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete',
  })
}

export function getRolesApi () {
  return request({
    url: authorizedBackendUrl + 'roles',
    method: 'get',
  })
}

export function createRole(data) {
  return request({
    url: authorizedBackendUrl + `roles`,
    method: 'post',
    data,
  })
}
export function editRole(data) {
  return request({
    url: authorizedBackendUrl + `roles`,
    method: 'patch',
    data,
  })
}
