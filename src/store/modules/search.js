
const state = {
    searchText: ''
}

const mutations = {
    setSearchText: (state, text) => {
        state.searchText = text
    }
}

const actions = {
    addSearchText({ commit }, text) {
        commit(mutations.setSearchText.name, text)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
