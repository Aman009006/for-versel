
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
  static startCreatingNewUser(store) {
    const dispatchName = this.#getDispatchName('startCreatingNewUserAction');
    store.dispatch(dispatchName);
  }

  static startEditingUser (store, user) {
    const dispatchName = this.#getDispatchName('startEditingUserAction');
    store.dispatch(dispatchName, user);
  }
  static editPassword (store, password) {
    const dispatchName = this.#getDispatchName('editPasswordAction');
    store.dispatch(dispatchName, password);
  }

  static isUserEditing(store, user) {
    const { editableUsers } = store.getters;
    const editingEmailKeys = Object.keys(editableUsers)
    return editingEmailKeys.includes(user.email) || this.isNewUser(store, user);
  }

  static stopCreatingOrAddingUser(store, user) {
    if (this.isNewUser(store, user)) {
      this.#stopCreatingNewEmail(store);
    } else {
      this.#stopEditingEmail(
        store,
        user.email
      );
    }
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

  static #stopEditingEmail(store, user) {
    const dispatchName = this.#getDispatchName('stopEditingUserAction');
    store.dispatch(dispatchName, user);
  }

  static #getDispatchName(action) {
    return 'users/' + action
  }
}
