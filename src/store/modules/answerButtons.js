/* eslint-disable no-async-promise-executor */
const state = {
    deletedAnswerButtonIndexes: [],
    newAnswerButtons: [],
    currentEditedAnswerButtons: []
}

const mutations = {
    saveCurrentEditedAnswerButtons: (state, answerButtons) => {
        state.currentEditedAnswerButtons = answerButtons
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
    deleteAnswerButton: (state, answerButton) => {
        if (isNewAnswerButton(state, answerButton)) {
            state.newAnswerButtons.splice(state.newAnswerButtons.indexOf(answerButton), 1)
        } else {
            const index = state.currentEditedAnswerButtons.indexOf(answerButton)
            state.deletedAnswerButtonIndexes.push(index)
        }
    }
}

const actions = {
    saveCopyOfButtons: ({ commit }, answerButtons) => {
        const copyAnswerButtons = JSON.parse(JSON.stringify(answerButtons))
        commit(mutations.saveCurrentEditedAnswerButtons.name, copyAnswerButtons)
    },
    addNewAnswerButton: ({ commit }) => {
        commit(mutations.addNewAnswerButton.name)
    },
    deleteAnswerButton: ({ commit }, answerButton) => {
        commit(mutations.deleteAnswerButton.name, answerButton)
    }
}

function isNewAnswerButton(state, answerButton) {
    if (state.newAnswerButtons.length == 0) {
        return false
    } else {
        return state.newAnswerButtons.includes(answerButton)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
