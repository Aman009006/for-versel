
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
        const { editablePlaceholders } = store.getters;
        const editingPlaceholderKeys = Object.keys(editablePlaceholders)
        return editingPlaceholderKeys.includes(placeholderKey);
    }

    static getEditablePlaceholder(store, placeholderKey) {
        const { editablePlaceholders } = store.getters;
        return editablePlaceholders[placeholderKey];
    }

    static #getDispatchName(action) {
        return 'placeholders/' + action
    }
}
