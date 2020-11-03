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

export function getAnswersforIntent(readableIntentName) {
  return request({
    url: authorizedBackendUrl + 'answersForReadableIntentName',
    /**
     * we have to use here post request:
     * if we use get here, data in body will be ignored
     */
    method: 'post',
    data: { readableIntentName }
  })
}

export function setAnswerText(answerId, text) {
  return request({
    url: authorizedBackendUrl + 'setAnswerText',
    method: 'post',
    data: { answerId, text }
  })
}
