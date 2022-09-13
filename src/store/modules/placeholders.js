import { getPlaceholders } from '@/api/placeholders';

const state = {
  placeholders: [],
  editingPlaceholderNames: new Set(),
}

const mutations = {
  setPlaceholders: (state, placeholders) => {
    state.placeholders = placeholders
  },
  addEditingPlaceholder: (state, placeholderKey) => {
    state.editingPlaceholderNames.add(placeholderKey);
  },
  deleteEditingPlaceholder: (state, placeholderKey) => {
    state.editingPlaceholderNames.delete(placeholderKey);
  }
}

const actions = {
  async fetchPlaceholders({ commit }) {
    const placeholders = await getPlaceholders()
    commit(mutations.setPlaceholders.name, placeholders)
  },
  startEditingPlaceholder({ commit }, placeholderKey) {
    commit(mutations.addEditingPlaceholder.name, placeholderKey)
  },
  stopEditingPlaceholder({ commit }, placeholderKey) {
    commit(mutations.deleteEditingPlaceholder.name, placeholderKey)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
