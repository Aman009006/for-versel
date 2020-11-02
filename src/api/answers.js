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
// export function sendChangedData(answer) {
//   return request({
//     url: authorizedBackendUrl + 'MarcPleaseSayHowItCalls',
//     method: 'post',
//     data: { answer }
//   })
// }
