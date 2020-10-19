import request from '@/utils/request'

export async function getSkills() {
// extract domain in const
  const res = await request({
    url: 'https://adminbackend.stadtwerk.bot/skillsWithIntentNames',
    method: 'get'
  })
  return res
}
