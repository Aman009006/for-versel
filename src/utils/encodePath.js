
/**
 * @param {string} pathComponent
 * @returns {string}
 * translates a path - component into a browser - readable name
 * the first replace replaces the opening bracket
 * the second replace replaces the closing bracket
 * the third replace replaces the question mark
 */
export function encodePathComponent(pathComponent) {
    return pathComponent.replace('(', '').replace(')', '').replace('?', '%3F')
}
