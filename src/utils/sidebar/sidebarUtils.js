/**
 * @param {string} className
 */
export function addActiveToSidebar(className) {
    const intentContainer = document.getElementsByClassName(className)[0];
    intentContainer.classList.add('is-active');
}

/**
 * @param {string} className
 */
export function removeActiveFromSidebar(className) {
    const intentContainer = document.getElementsByClassName(className)[0];
    intentContainer.classList.remove('is-active');
}