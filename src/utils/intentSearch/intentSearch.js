/**
 * Returns true if the intentData string matches the newValue string
 * @param {String} intentData
 * @param {String} newValue
 * @returns {Boolean}
 */
export function searchUniversal(intentData, newValue) {
    const intentName = intentData.name;
    const intentTechnicalName = intentData.intent;
    const intentDescription = intentData.description;
    const intentExample = intentData.utterances;
    const intentAnswer = intentData.texts;
    const intentPlaceholderKey = intentData.key;
    const intentPlaceholderValue = intentData.value;
    const intentSkillName = intentData.SkillName;
    const intentIntents = intentData.Intents;

    return ignoreCaseAndCheckInclude(intentName, newValue) ||
    ignoreCaseAndCheckInclude(intentTechnicalName, newValue) ||
    ignoreCaseAndCheckInclude(intentDescription, newValue) ||
    ignoreCaseAndCheckInclude(intentPlaceholderKey, newValue) ||
    ignoreCaseAndCheckInclude(intentPlaceholderValue, newValue) ||
    ignoreCaseAndCheckInclude(intentSkillName, newValue) ||
    searchIntentSubArray(intentExample, newValue) ||
    searchIntentSubArray(intentIntents, newValue) ||
    searchIntentSubArray(intentAnswer, newValue);
}

function ignoreCaseAndCheckInclude(intent, searchString) {
    return intent?.toLowerCase().includes(searchString.toLowerCase());
}

/**
 * @param {Array} intentArray
 * @param {String} newValue
 * @returns {Boolean}
 */
function searchIntentSubArray(intentArray, newValue) {
    if (intentArray !== undefined) {
        for (const item of intentArray) {
            if (item === null) {
                continue;
            } else if (typeof item === 'string') {
                if (ignoreCaseAndCheckInclude(item, newValue)) {
                    return true;
                }
            } else if ('text' in item) {
                if (ignoreCaseAndCheckInclude(item.text, newValue)) {
                    return true;
                }
            } else if ('name' in item) {
                if (ignoreCaseAndCheckInclude(item.name, newValue)) {
                    return true;
                }
            }
        }
    }
}
