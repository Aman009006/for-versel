import request from '@/utils/request'
import { authorizedBackendUrl } from '@/utils/backendUrl'

/**
 * @returns {{ SkillName: string; IntentNames: string[]; }[]}
 */
export async function getSkillsWithIntents() {
  // extract domain in const
  const res = await request({
    url: authorizedBackendUrl + 'skillsWithIntentNames',
    method: 'get'
  })
  return res
}
