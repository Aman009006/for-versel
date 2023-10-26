export default class LastClickedIntent {
    /*
     * @param {String} virtualIntentName
     * @param {String} intentGroup
     */
    constructor(virtualIntentName, intentGroup) {
        this.virtualIntentName = virtualIntentName;
        this.intentGroup = intentGroup;
        this.storageIntentGroup = sessionStorage.getItem('lastClickedIntentGroup');
    }

    addDataToSession() {
        sessionStorage.setItem('lastClickedVirtualIntent', this.virtualIntentName);
        sessionStorage.setItem('lastClickedIntentGroup', this.intentGroup);
    }

    handleScrollProcess() {
        if (this.#confirmSessionStorageData()) {
            this.#scrollToIntent();
        }
    }

    /*
     * @return {boolean} true if the last clicked intent is the same as the current intent
     */
    #confirmSessionStorageData() {
        console.log('confirming')
        if (this.storageIntentGroup === this.intentGroup) {
            return true;
        }
    }

    #scrollToIntent() {
        const cords = this.#getTableCoordinates();
        console.log('cords: ', cords);
        window.scrollTo({
            top: cords,
            behavior: 'smooth'
        });
    }

    #getTableCoordinates() {
        const tableRow = document.getElementsByClassName('is-storage-intent')[0];
        const rect = tableRow.getBoundingClientRect();
        const cords = rect.top;
        return cords;
    }
}