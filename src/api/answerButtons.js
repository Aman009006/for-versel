import request from '@/utils/request'
import { authorizedBackendUrl } from '@/utils/backendUrl'

export function insertAnswerButton(button) {
    return request({
        url: authorizedBackendUrl + "insertButton",
        method: "POST",
        data: { button }
    })
}

export function deleteAnswerButton(button) {
    return request({
        url: authorizedBackendUrl + "answerButton",
        method: "DELETE",
        data: { button }
    })
}
