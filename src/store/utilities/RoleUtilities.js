
export default class RoleUtilities {
    static async fetchRoleAccesses(store, roleName) {
        const dispatchName = this.#getDispatchName('setAccessesRoleAction');
        const load = this.#getDispatchName('setLoadingStatusAction');
        store.dispatch(load, true);
        await store.dispatch(dispatchName, roleName);
    }
    static async fetchRoles(store) {
        const dispatchName = this.#getDispatchNamePermission('setRoles');
        await store.dispatch(dispatchName);
    }
    static async createRoleUtils(store, data) {
        const dispatchName = this.#getDispatchName('startCreatingRole');
        await store.dispatch(dispatchName, data);
    }
    static async editRoleUtils(store, data) {
        const dispatchName = this.#getDispatchName('startEditingRole');
        await store.dispatch(dispatchName, data);
    }

    static selectAllPermissionInGroup(store, groupName, keyToChange) {
        const dispatchName = this.#getDispatchName('selectedAllGroupPermissionAction');
        store.dispatch(dispatchName, {groupName, keyToChange});
    }
    static selectOnePermissionInGroup(store, groupName, intentName, keyToChange) {
        const dispatchName = this.#getDispatchName('selectedOnePermissionAction');
        store.dispatch(dispatchName, {groupName, intentName, keyToChange});
    }

    static setRoleDescriptionUtils(store, description) {
        const dispatchName = this.#getDispatchName('setRoleDescriptionAction');
        store.dispatch(dispatchName, description);
    }

    static deleteRoleAccessesUtils(store) {
        const dispatchName = this.#getDispatchName('deleteRoleAccessesAction');
        store.dispatch(dispatchName);
    }

    static #getDispatchName(action) {
        return 'role/' + action
    }
    static #getDispatchNamePermission(action) {
        return 'permission/' + action
    }
}
