import request from '@/utils/request'
import { authorizedBackendUrl } from '@/utils/backendUrl'

/**
 * @returns {{ customer: string; avatar_link: string; powerBI_link: string; admin_ui_test_page_link: string }}
 */
export async function getCustomerMetaData() {
  // extract domain in const
  const res = await request({
    url: authorizedBackendUrl + 'customerMetaData',
    method: 'get',
  })
  return res
}
