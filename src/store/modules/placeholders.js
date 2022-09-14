import { getPlaceholders } from '@/api/placeholders';
import ObjectUtils from '@/utils/ObjectUtils';

const state = {
  /**
   * This is a "mirrow" of the database placeholders.
   * Please don't use this placeholders to save data, which
   * is not in the database.
   */
  placeholders: [],
  editablePlaceholders: {},
}

const mutations = {
  setPlaceholders: (state, placeholders) => {
    state.placeholders = placeholders
  },
  addEditingPlaceholder: (state, placeholderKey) => {
    const originalPlaceholder = getPlaceholder(state, placeholderKey);
    state.editablePlaceholders[placeholderKey] = ObjectUtils.createCopyOfSerializableObject(originalPlaceholder);
  },
  deleteEditingPlaceholder: (state, placeholderKey) => {
    delete state.editablePlaceholders[placeholderKey];
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

function getPlaceholder(state, placeholderKey) {
  return state.placeholders.find(isPlaceholderWithKey(placeholderKey));
}

function isPlaceholderWithKey(placeholderKey) {
  return (placeholder) => placeholder.key == placeholderKey;
}
