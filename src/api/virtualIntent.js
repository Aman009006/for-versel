import request from '@/utils/request'
import { authorizedBackendUrl } from '@/utils/backendUrl'

export async function getVirtualIntents() {
    return request({
        url: authorizedBackendUrl + "getVirtualIntents",
        method: "get"
    })
}