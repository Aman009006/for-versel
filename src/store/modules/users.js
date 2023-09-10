import ObjectUtils from '@/utils/ObjectUtils';
import { getAllUsers } from "@/api/users";

const state = {
  users: [],
  editableUsers: {},
  newUsers: null,
  userPassword: ''
}

const mutations = {
  setUsers: (state, placeholders) => {
    state.users = placeholders
  },
  addNewUser: (state) => {
    if (state.newUsers == null) {
      state.newUsers = {
        email: ''
      }
    }
  },
  removeNewUser: (state) => {
    state.newUsers = null;
  },
  addEditingUser: (state, user) => {
    const originalUser = getUser(state, user);
    state.editableUsers[user] = ObjectUtils.createCopyOfSerializableObject(originalUser);
  },
  deleteEditingUser: (state, userEmail) => {
    delete state.editableUsers[userEmail];
  },
  addPassword: (state, userPassword) => {
    state.userPassword = userPassword;
  }
}

const actions = {
  async fetchUsersAction({ commit }) {
    const placeholders = await getAllUsers()
    commit(mutations.setUsers.name, placeholders)
  },
  startCreatingNewUserAction({ commit }) {
    commit(mutations.addNewUser.name)
  },
  stopCreatingNewUserAction({ commit }) {
    commit(mutations.removeNewUser.name)
  },
  startEditingUserAction({ commit }, user) {
    commit(mutations.addEditingUser.name, user)
  },
  stopEditingUserAction({ commit }, userEmail) {
    commit(mutations.deleteEditingUser.name, userEmail)
  },
  editPasswordAction({ commit }, userPassword) {
    commit(mutations.addPassword.name, userPassword)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

function getUser(state, placeholderKey) {
  return state.users.find(isUserWithKey(placeholderKey));
}

function isUserWithKey(placeholderKey) {
  return (users) => users.email == placeholderKey;
}
