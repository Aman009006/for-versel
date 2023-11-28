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
    const intentPermissionName = searchableObject.permissionName;
    const intentPermissions = searchableObject.permissions;

    return ignoreCaseAndCheckInclude(intentName, newValue) ||
    ignoreCaseAndCheckInclude(intentTechnicalName, newValue) ||
    ignoreCaseAndCheckInclude(intentDescription, newValue) ||
    ignoreCaseAndCheckInclude(placeholderKey, newValue) ||
    ignoreCaseAndCheckInclude(placeholderValue, newValue) ||
    ignoreCaseAndCheckInclude(intentSkillName, newValue) ||
    ignoreCaseAndCheckInclude(intentPermissionName, newValue) ||
    searchSubArray(intentPermissions, newValue) ||
    searchSubArray(intentExample, newValue) ||
    searchSubArray(intentIntents, newValue) ||
    searchSubArray(intentAnswer, newValue);
}

function ignoreCaseAndCheckInclude(keyToCheckAgainst, searchString) {
    return keyToCheckAgainst?.toLowerCase().includes(searchString.toLowerCase());
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
