import backendUrl from '@/utils/backendUrl'
import request from '@/utils/request'

/**
 * @param {string} recepient
 */
export async function sendPasswordResetMail(recepient) {
    return request({
        url: backendUrl + 'sendResetMail',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ 'recepient': recepient })
    })
}

export async function resetPassword(password, pageUrl) {
    return request({
        url: backendUrl + 'passwordReset',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ 'password': password, 'pageUrl': pageUrl })
    })
}