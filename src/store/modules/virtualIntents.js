import { getVirtualIntents } from "@/api/virtualIntents"

const state = {
    virtualIntents: [],
}

const mutations = {
    setVirtualIntents: (state, virtualIntents) => {
        //copy of the array
        state.virtualIntents = virtualIntents.slice()
    }
}

const actions = {
    async getVirtualIntents({ commit }) {
        const virtualIntents = await getVirtualIntents();
        commit(mutations.setVirtualIntents.name, virtualIntents)
    }
}