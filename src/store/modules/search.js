
const state = {
    searchText: ''
}

const mutations = {
    setSearchText: (state, text) => {
        state.searchText = text
    },
    removeSearchText: (state) => {
        state.searchText = ''
    }
}

const actions = {
    addSearchText({ commit }, text) {
        commit(mutations.setSearchText.name, text)
    },
    removeSearchText({ commit }) {
        commit(mutations.removeSearchText.name)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
