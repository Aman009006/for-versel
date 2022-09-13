const state = {
    deletedAnswerButtons: [],
    currentAnswerButtons: []
}

const mutations = {
    pushDeletedAnswerButton: (state, deletedAnswerButton) => {
        state.deletedAnswerButtons.push(deletedAnswerButton)
    },
    setCurrentAnswerButtons: (state, AnswerButtons) => {
        state.currentAnswerButtons = AnswerButtons
    }
}

const actions = {
    updateCurrentAnswerButtons({ commit }, AnswerButtons) {
        commit(mutations.setCurrentAnswerButtons.name, AnswerButtons)
    },
    pushDeletedAnswerButton: ({ commit }, deletedAnswerButton) => {
        commit(mutations.pushDeletedAnswerButton.name, deletedAnswerButton)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
