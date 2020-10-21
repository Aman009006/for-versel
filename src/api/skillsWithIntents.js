import request from '@/utils/request'
import backendUrl from '@/utils/backendUrl'

/**
 * @returns {{ SkillName: string; IntentNames: string[]; }[]}
 */
export async function getSkillsWithIntents() {
  // extract domain in const
  const res = await request({
    url: backendUrl + 'skillsWithIntentNames',
    method: 'get'
  })
  return res
}
