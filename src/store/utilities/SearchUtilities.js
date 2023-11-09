
export default class SearchUtilities {
    static addSearchTextToStore (store, text) {
        const dispatchName = this.#getDispatchName('addSearchText');
        store.dispatch(dispatchName, text);
    }
    static removeSearchTextToStore (store) {
        const dispatchName = this.#getDispatchName('removeSearchText');
        store.dispatch(dispatchName);
    }

    static #getDispatchName(action) {
        return 'search/' + action
    }
}
