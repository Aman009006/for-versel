
export default class PlaceholderUtilities {
    static async fetchPlaceholders(store) {
        const dispatchName = this.#getDispatchName('fetchPlaceholders');
        await store.dispatch(dispatchName);
    }

    static startEditingPlaceholder(store, placeholderKey) {
        const dispatchName = this.#getDispatchName('startEditingPlaceholder');
        store.dispatch(dispatchName, placeholderKey);
    }

    static stopEditingPlaceholder(store, placeholderKey) {
        const dispatchName = this.#getDispatchName('stopEditingPlaceholder');
        store.dispatch(dispatchName, placeholderKey);
    }

    static isPlaceholderEditing(store, placeholderKey) {
        const { editingPlaceholderNames } = store.getters;
        return editingPlaceholderNames.has(placeholderKey);
    }

    static #getDispatchName(action) {
        return 'placeholders/' + action
    }
}
