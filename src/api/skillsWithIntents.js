import request from '@/utils/request'

/**
 * @returns {{ SkillName: string; IntentNames: string[]; }[]}
 */
export async function getSkillsWithIntents() {
  // extract domain in const
  const res = await request({
    url: 'https://adminbackend.stadtwerk.bot/skillsWithIntentNames',
    method: 'get'
  })
  return res
}
