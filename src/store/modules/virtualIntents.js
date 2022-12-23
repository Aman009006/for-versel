import { getVirtualIntents } from "@/api/virtualIntent"

const state = {
    virtualIntents: [],
}

const mutations = {
    SET_VIRTUALINTENT: (state, virtualIntents) => {
        state.virtualIntents = virtualIntents.map((item) => {
            return {
                value: item.virtualIntent,
                answerConfigId: item.answerConfigId
            }
        })
    }
}

const actions = {
    getVirtualIntents: async ({ commit }) => {
        const virtualIntents = await getVirtualIntents()
        commit(mutations.SET_VIRTUALINTENT.name, virtualIntents)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}