
export default class UsersUtilities {
  static async fetchUsers(store) {
    const dispatchName = this.#getDispatchName('fetchUsersAction');
    await store.dispatch(dispatchName);
  }

  static getAllUsers(store) {
    const { users, newUsers } = store.getters;
    if (newUsers != null) {
      return [...users, newUsers];
    }
    return users;
  }

  static getDefaultRoles(store) {
    const { allRoles } = store.getters;
    return allRoles.filter(item => item.isDefault);
  }

  static getNotDefaultRoles(store) {
    const { allRoles } = store.getters;
    return allRoles.filter(item => !item.isDefault);
  }
  static startCreatingNewUser(store) {
    const dispatchName = this.#getDispatchName('startCreatingNewUserAction');
    store.dispatch(dispatchName);
  }

  static startEditingUser (store, user) {
    const dispatchName = this.#getDispatchName('startEditingUserAction');
    store.dispatch(dispatchName, user);
  }

  static isUserEditing(store, user) {
    const { editableUsers } = store.getters;
    const editingEmailKeys = Object.keys(editableUsers)
    return editingEmailKeys.includes(user.email) || this.isNewUser(store, user);
  }

  static stopEditing(store) {
      this.#stopEditingEmail(store);
  }

  static getEditableUser (store, user) {
    const { editableUsers, newUsers } = store.getters;
    const editableUser = editableUsers[user];
    if (editableUser == null) {
      return newUsers;
    }
    return editableUser;
  }
  static isNewUser(store, user) {
    const { newUsers } = store.getters;
    return newUsers == user;
  }

  static #stopCreatingNewEmail(store) {
    const dispatchName = this.#getDispatchName('stopCreatingNewUserAction');
    store.dispatch(dispatchName);
  }

  static #stopEditingEmail(store) {
    const dispatchName = this.#getDispatchName('stopEditingUserAction');
    store.dispatch(dispatchName);
  }

  static #getDispatchName(action) {
    return 'users/' + action
  }
}
