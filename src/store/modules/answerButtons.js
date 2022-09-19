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
        state.currentAnswerButtons = []
    },
    addNewAnswerButton: (state) => {
        const newAnswerButton = {
            title: "",
            value: "",
            type: "imBack",
            identificator: null,
        }
        state.newAnswerButtons.push(newAnswerButton)
    },
    deleteAnswerButton: (state, answerButtonAndIndex) => {
        const { button, rowIndex } = answerButtonAndIndex
        state.currentAnswerButtons.splice(rowIndex, 1)
        let buttonNotDeleted = true
        let index = rowIndex;
        if (isNewAnswerButton(state, button)) {
            state.newAnswerButtons.splice(state.newAnswerButtons.indexOf(button), 1)
        } else {
            while (buttonNotDeleted) {
                if (!(index in state.deletedAnswerButtons)) {
                    state.deleteAnswerButton.push(index)
                    buttonNotDeleted = false
                } else {
                    index++;
                }
            }
        }
    }
}

const actions = {
    updateStateProperties({ commit }, answerButtons) {
        commit(mutations.updateStateProperties.name, answerButtons)
    },
    resetStateProperties: ({ commit }, answerButtons) => {
        commit(mutations.resetStateProperties.name, answerButtons)
    },
    addNewAnswerButton: ({ commit }) => {
        commit(mutations.addNewAnswerButton.name)
    },
    deleteAnswerButton: ({ commit }, answerButtonAndIndex) => {
        commit(mutations.deleteAnswerButton.name, answerButtonAndIndex)
    }
}

function isNewAnswerButton(state, answerButton) {
    if (state.newAnswerButtons.length == 0) {
        return false
    } else {
        // return !(index - state.unchangedAnswerButtons.length - state.deletedAnswerButtons.length < 0)
        return state.newAnswerButtons.includes(answerButton)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
