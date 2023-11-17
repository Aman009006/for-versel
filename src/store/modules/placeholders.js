import { getPlaceholders } from '@/api/placeholders';
import ObjectUtils from '@/utils/ObjectUtils';

const state = {
  /**
   * This is a "mirror" of the database placeholders.
   * Please don't use this placeholders to save data, which
   * is not in the database.
   */
  placeholders: [],
  editablePlaceholders: {},
  newPlaceholder: null,
  filteredPlaceholders: []
}

const mutations = {
  setPlaceholders: (state, placeholders) => {
    state.placeholders = placeholders
  },
  addNewPlaceholder: (state) => {
    if (state.newPlaceholder == null) {
      state.newPlaceholder = {
        key: '',
        value: ''
      }
    }
  },
  removeNewPlaceholder: (state) => {
    state.newPlaceholder = null;
  },
  addEditingPlaceholder: (state, placeholderKey) => {
    const originalPlaceholder = getPlaceholder(state, placeholderKey);
    state.editablePlaceholders[placeholderKey] = ObjectUtils.createCopyOfSerializableObject(originalPlaceholder);
  },
  deleteEditingPlaceholder: (state, placeholderKey) => {
    delete state.editablePlaceholders[placeholderKey];
  },
  setFilteredPlaceholders: (state, filteredPlaceholders) => {
    state.filteredPlaceholders = filteredPlaceholders;
  }
}

const actions = {
  async fetchPlaceholders({ commit }) {
    const placeholders = await getPlaceholders()
    commit(mutations.setPlaceholders.name, placeholders)
  },
  startCreatingNewPlaceholder({ commit }) {
    commit(mutations.addNewPlaceholder.name)
  },
  stopCreatingNewPlaceholder({ commit }) {
    commit(mutations.removeNewPlaceholder.name)
  },
  startEditingPlaceholder({ commit }, placeholderKey) {
    commit(mutations.addEditingPlaceholder.name, placeholderKey)
  },
  stopEditingPlaceholder({ commit }, placeholderKey) {
    commit(mutations.deleteEditingPlaceholder.name, placeholderKey)
  },
  setFilteredPlaceholdersAction({ commit }, filteredPlaceholders) {
    commit(mutations.setFilteredPlaceholders.name, filteredPlaceholders)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}

function getPlaceholder(state, placeholderKey) {
  return state.placeholders.find(isPlaceholderWithKey(placeholderKey));
}

function isPlaceholderWithKey(placeholderKey) {
  return (placeholder) => placeholder.key == placeholderKey;
}
