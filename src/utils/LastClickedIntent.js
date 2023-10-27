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
        let confirmed = false;
        try {
            confirmed = this.#confirmSessionStorageData();
        } catch (e) {
            return false;
        }
        if (confirmed) {
            this.#scrollToIntent();
        }
    }

    /** @returns {boolean} */
    #confirmSessionStorageData() {
        if (this.storageIntentGroup != this.intentGroup) {
            throw new Error('Intent Group isnt matching.');
        } else {
            return true;
        }
    }

    async #scrollToIntent() {
        const cords = await this.#getTableCoordinates();
        const tableRowHeight = 80;
        window.scrollTo({
            top: cords - tableRowHeight,
            behavior: 'smooth'
        });
        this.#highlightIntent();
    }

    /** @returns {Promise} */
    async #getTableCoordinates() {
        return new Promise((resolve) => {
            const checkForTable = setInterval(() => {
                const tableRow = document.getElementsByClassName('is-storage-intent')[0];
                if (tableRow) {
                    clearInterval(checkForTable);
                    const rect = tableRow.getBoundingClientRect();
                    const cords = rect.top;
                    resolve(cords);
                }
            }, 100);
        });
    }

    #highlightIntent() {
        const tableRow = document.getElementsByClassName('is-storage-intent')[0];
        tableRow.classList.add('is-highlighted');
        setTimeout(() => {
            tableRow.classList.remove('is-highlighted');
        }, 2000);
    }
}