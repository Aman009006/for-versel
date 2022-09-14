const state = {
    deletedAnswerButtons: [],
    newAnswerButtons: [],
    unchangedAnswerButtons: [],
    currentAnswerButtons: []
}

const mutations = {
    updateStateProperties: (state, answerButtons) => {
        state.newAnswerButtons = []
        state.deletedAnswerButtons = state.unchangedAnswerButtons.filter((button) => button?.deleted)
        state.currentAnswerButtons = answerButtons
        answerButtons.forEach((button) => {
            if (button?.new == true) {
                state.newAnswerButtons.push(button)
            }
        })
    },
    resetStateProperties: (state, answerButtons) => {
        state.deletedAnswerButtons = []
        state.unchangedAnswerButtons = answerButtons
        state.newAnswerButtons = []
    },
    markDeleted: (state, rowIndex) => {
        let index = 0;
        state.unchangedAnswerButtons.forEach((button) => {
            if (button?.deleted) {
                index--;
            }
            if (index == rowIndex) {
                button.deleted = true
            }
            index++
        });
    }
}

const actions = {
    updateStateProperties({ commit }, answerButtons) {
        commit(mutations.updateStateProperties.name, answerButtons)
    },
    resetStateProperties: ({ commit }, answerButtons) => {
        commit(mutations.resetStateProperties.name, answerButtons)
    },
    markDeleted: ({ commit }, index) => {
        commit(mutations.markDeleted.name, index)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
