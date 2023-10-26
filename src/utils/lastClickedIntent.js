export default class LastClickedIntent {
    /*
     * @param {String} virtualIntentName
     * @param {String} intentGroup
     */
    constructor(virtualIntentName, intentGroup) {
        this.virtualIntentName = virtualIntentName;
        this.intentGroup = intentGroup;
    }

    addDataToSession() {
        sessionStorage.setItem('lastClickedVirtualIntent', this.virtualIntentName);
        sessionStorage.setItem('lastClickedIntentGroup', this.intentGroup);
    }

    /*
     * @return {boolean} true if the last clicked intent is the same as the current intent
     */
    confirmSessionStorageData() {
        const storageIntentGroup = sessionStorage.getItem('lastClickedIntentGroup');
        if (storageIntentGroup === this.intentGroup) {
            return true;
        }
    }

    #clearSessionStorage() {
        sessionStorage.removeItem('lastClickedVirtualIntent');
        sessionStorage.removeItem('lastClickedIntentGroup');
    }
}