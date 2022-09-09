import { getPlaceholders } from '@/api/placeholders';

const state = {
  placeholders: [],
}

const mutations = {
  setPlaceholders: (state, placeholders) => {
    state.placeholders = placeholders
  },
}

const actions = {
  async fetchPlaceholders({ commit }) {
    const placeholders = await getPlaceholders()
    commit(mutations.setPlaceholders.name, placeholders)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
