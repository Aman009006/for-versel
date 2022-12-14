import request from '@/utils/request'
import { authorizedBackendUrl } from '@/utils/backendUrl'

export function getVirtualIntents() {
    return request({
        url: authorizedBackendUrl + "getVirtualIntents",
        method: "GET"
    })
}