
export default class SearchUtilities {
    static addSearchTextToStore (store, text) {
        const dispatchName = this.#getDispatchName('addSearchText');
        store.dispatch(dispatchName, text);
    }

    static #getDispatchName(action) {
        return 'search/' + action
    }
}
