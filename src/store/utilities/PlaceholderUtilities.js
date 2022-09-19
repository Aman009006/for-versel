
export default class PlaceholderUtilities {
    static async fetchPlaceholders(store) {
        const dispatchName = this.#getDispatchName('fetchPlaceholders');
        await store.dispatch(dispatchName);
    }

    static getAllPlaceholders(store) {
        const { placeholders, newPlaceholder } = store.getters;
        if (newPlaceholder != null) {
            return [...placeholders, newPlaceholder];
        }
        return placeholders;
    }

    static startCreatingNewPlaceholder(store) {
        const dispatchName = this.#getDispatchName('startCreatingNewPlaceholder');
        store.dispatch(dispatchName);
    }

    static startEditingPlaceholder(store, placeholderKey) {
        const dispatchName = this.#getDispatchName('startEditingPlaceholder');
        store.dispatch(dispatchName, placeholderKey);
    }

    static stopCreatingOrAddingPlaceholder(store, placeholder) {
        if (this.isNewPlaceholder(store, placeholder)) {
            this.#stopCreatingNewPlaceholder(store);
        } else {
            this.#stopEditingPlaceholder(
                store,
                placeholder.key
            );
        }
    }

    static isPlaceholderEditing(store, placeholder) {
        const { editablePlaceholders } = store.getters;
        const editingPlaceholderKeys = Object.keys(editablePlaceholders)
        return editingPlaceholderKeys.includes(placeholder.key) || this.isNewPlaceholder(store, placeholder);
    }

    static getEditablePlaceholder(store, placeholderKey) {
        const { editablePlaceholders, newPlaceholder } = store.getters;
        const editablePlaceholder = editablePlaceholders[placeholderKey];
        if (editablePlaceholder == null) {
            return newPlaceholder;
        }
        return editablePlaceholder;
    }

    static isNewPlaceholder(store, placeholder) {
        const { newPlaceholder } = store.getters;
        return newPlaceholder == placeholder;
    }

    static #stopCreatingNewPlaceholder(store) {
        const dispatchName = this.#getDispatchName('stopCreatingNewPlaceholder');
        store.dispatch(dispatchName);
    }

    static #stopEditingPlaceholder(store, placeholderKey) {
        const dispatchName = this.#getDispatchName('stopEditingPlaceholder');
        store.dispatch(dispatchName, placeholderKey);
    }

    static #getDispatchName(action) {
        return 'placeholders/' + action
    }
}
