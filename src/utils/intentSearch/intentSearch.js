/**
 * Returns true if the searchableObject string matches the newValue string
 * @param {Object} searchableObject
 * @param {String} newValue
 * @returns {Boolean}
 */
export function searchComponentData(searchableObject, newValue) {
    const intentName = searchableObject.name;
    const intentTechnicalName = searchableObject.intent;
    const intentDescription = searchableObject.description;
    const intentExample = searchableObject.utterances;
    const intentAnswer = searchableObject.texts;
    const placeholderKey = searchableObject.key;
    const placeholderValue = searchableObject.value;
    const intentSkillName = searchableObject.SkillName;
    const intentIntents = searchableObject.Intents;

    return keyToCheckAgainst(intentName, newValue) ||
    keyToCheckAgainst(intentTechnicalName, newValue) ||
    keyToCheckAgainst(intentDescription, newValue) ||
    keyToCheckAgainst(placeholderKey, newValue) ||
    keyToCheckAgainst(placeholderValue, newValue) ||
    keyToCheckAgainst(intentSkillName, newValue) ||
    searchSubArray(intentExample, newValue) ||
    searchSubArray(intentIntents, newValue) ||
    searchSubArray(intentAnswer, newValue);
}

function keyToCheckAgainst(intent, searchString) {
    return intent?.toLowerCase().includes(searchString.toLowerCase());
}

/**
 * @param {Array} subArray
 * @param {String} newValue
 * @returns {Boolean}
 */
function searchSubArray(subArray, newValue) {
    if (subArray !== undefined) {
        for (const item of subArray) {
            if (item === null) {
                continue;
            } else if (typeof item === 'string') {
                if (keyToCheckAgainst(item, newValue)) {
                    return true;
                }
            } else if ('text' in item) {
                if (keyToCheckAgainst(item.text, newValue)) {
                    return true;
                }
            } else if ('name' in item) {
                if (keyToCheckAgainst(item.name, newValue)) {
                    return true;
                }
            }
        }
    }
}
