import request from '@/utils/request'
import { authorizedBackendUrl } from '@/utils/backendUrl'

/**
 * @returns {{ SkillName: string; Intents: Intent[]; }[]}
 */
export function getSkillsWithIntents() {
  // extract domain in const
  const res = request({
    url: authorizedBackendUrl + 'skillsWithIntentNames',
    method: 'get',
  })
  return res
}
/**
 * A button as it is described in the database
 * @typedef {{ type: string, title: string, value: string, identificator: string}} Button
 */
/**
 * The configuration informations of an answer as described in the database
 * @typedef {{ type: string, redirectToVirtualIntentName: string}} AnswerConfig
 */
/**
 * All informations concerning an answer.
 * @typedef {Object} Answer
 * @property {string} id - answer id
 * @property {string} text - text for answer
 * @property {string} readableName - human readable name of intent
 * @property {string} description - description of this perticular answer
 * @property {Button[]} buttons - buttons mapped to this answer
 */
/**
 * @typedef {{ answers: Answer[], answerConfig: AnswerConfig}} AnswerInfo
 */
/**
 * @param {string} virtualIntentName human readable name for a particular intent
 * @returns {AnswerInfo} an information object containing all the information for an intent
 */
export function getAnswersforIntent(virtualIntentName) {
  return request({
    url: authorizedBackendUrl + 'answers',
    /**
     * we have to use post request here:
     * if we use get, data in body will be ignored
     */
    method: 'post',
    data: { virtualIntentName },
  })
}

export function setAnswerText(answerId, text) {
  return request({
    url: authorizedBackendUrl + 'setAnswerText',
    method: 'post',
    data: { answerId, text },
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
export function setButtonProperties(
  answerId,
  originalButtonTitle,
  newButtonTitle,
  newButtonType,
  newButtonValue,
  newButtonVirtualIntent
) {
  return request({
    url: authorizedBackendUrl + 'setButtonProperties',
    method: 'post',
    data: {
      answerId,
      originalButtonTitle,
      newButtonTitle,
      newButtonType,
      newButtonValue,
      newButtonVirtualIntent
    },
  })
}
