import request from '@/utils/request'
import { authorizedBackendUrl } from '@/utils/backendUrl'

export async function getPlaceholders() {
    return request({
        url: authorizedBackendUrl + 'placeholders',
        method: 'GET'
    })
}

export async function setPlaceholder(key, value) {
    return request({
        url: authorizedBackendUrl + 'placeholders',
        method: 'POST',
        data: {
            key,
            value
        }
    })
}

export async function deletePlaceholder(key, value) {
    return request({
        url: authorizedBackendUrl + 'placeholders',
        method: 'DELETE',
        data: {
            key,
            value
        }
    })
}

export async function updatePlaceholder(key, value, oldKey) {
    return request({
        url: authorizedBackendUrl + 'placeholders',
        method: 'PATCH',
        data: {
            key,
            value,
            oldKey
        }
    })
}