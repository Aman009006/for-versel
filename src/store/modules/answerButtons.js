const state = {
    deletedAnswerButtons: [],
    currentAnswerButtons: []
}

const mutations = {
    pushDeletedAnswerButton: (state, deletedAnswerButton) => {
        state.deletedAnswerButtons.push(deletedAnswerButton)
    },
    setCurrentAnswerButtons: (state, answerButtons) => {
        state.currentAnswerButtons = answerButtons
    },
    resetAnswerButtonsProperties: (states, answerButtons) => {
        state.deletedAnswerButtons = []
        state.currentAnswerButtons = answerButtons
    }
}

const actions = {
    updateCurrentAnswerButtons({ commit }, answerButtons) {
        commit(mutations.setCurrentAnswerButtons.name, answerButtons)
    },
    pushDeletedAnswerButton: ({ commit }, deletedAnswerButton) => {
        commit(mutations.pushDeletedAnswerButton.name, deletedAnswerButton)
    },
    resetAnswerButtonsProperties: ({ commit }, answerButtons) => {
        commit(mutations.resetAnswerButtonsProperties.name, answerButtons)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
