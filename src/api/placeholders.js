import request from '@/utils/request'
import { authorizedBackendUrl } from '@/utils/backendUrl'

/**
 * @returns {Placeholder[]} all placeholders from the database
 */
export async function getPlaceholders() {
    return request({
        url: authorizedBackendUrl + 'placeholders',
        method: 'GET'
    })
}

/**
 * @param {string} key 
 * @param {string} value 
 */
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

/**
 * @param {string} key 
 * @param {string} value 
 */
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

/**
 * @param {string} key 
 * @param {string} value 
 * @param {string} oldKey 
 */
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

/**
 * @typedef {Object} Placeholder 
 * @property {string} key
 * @property {string} value
 */