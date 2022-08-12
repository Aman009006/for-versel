import { getAnswersforIntent } from "@/api/answers";
import Vue from "vue";

const state = {
    /**
     * The intents, which only will be
     * shown, when fetched by "getAndSetIntentAnswers".
     */
    intents: {}
}

const mutations = {
    setIntentAnswers: (state, { intentName, answerInfo }) => {
        Vue.set(state.intents, intentName, answerInfo)
    }
}

const actions = {
    async getAndSetIntentAnswers({ commit }, intentName) {
        const answerInfo = await getAnswersforIntent(intentName);
        commit(mutations.setIntentAnswers.name, {
            intentName,
            answerInfo
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
