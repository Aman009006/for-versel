import request from '@/utils/request'
import { authorizedBackendUrl } from '@/utils/backendUrl'

/**
 * @returns {{ SkillName: string; Intents: Intent[]; }[]}
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
     * we have to use post request here:
     * if we use get, data in body will be ignored
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
/**
 * Sends the post request to the BE to save the new button properties
 * to the button with the specified original title and answer id.
 * @param answerId is the id of the answer which contains the current button.
 * @param originalButtonTitle is the original title of the button, which is used to identify
 * the current button together with the answer ID in DB table answer_buttons
 * @param newButtonTitle is the new title of the current button
 * which has to be saved in the DB table answer_buttons
 * @param newButtonType is the new type of the current button
 * which has to be saved in the DB table answer_buttons
 * @param newButtonValue is the new value of the current button
 * which has to be saved in the DB table answer_buttons
 */
export function setButtonProperties(answerId, originalButtonTitle, newButtonTitle, newButtonType, newButtonValue) {
  return request({
    url: authorizedBackendUrl + 'setButtonProperties',
    method: 'post',
    data: { answerId, originalButtonTitle, newButtonTitle, newButtonType, newButtonValue }
  })
}
