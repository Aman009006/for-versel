import { getPlaceholders } from '@/api/placeholders';
import Vue from 'vue';

const state = {
    placeholders: []
}

const mutations = {
    setPlaceholders: (state, placeholders) => {
        Vue.set(state, 'placeholders', placeholders);
    }
}

const actions = {
    async fetchPlaceholders({ commit }) {
        const placeholders = await getPlaceholders();
        commit(mutations.setPlaceholders.name, placeholders)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
