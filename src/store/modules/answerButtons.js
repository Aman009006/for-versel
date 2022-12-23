import { buttonTypes } from "@/constants"

/* eslint-disable no-async-promise-executor */
const state = getInitialState()

const mutations = {
    resetStateAndSaveCopyOfButtons: (state, answerButtons) => {
        resetState(state)
        if (answerButtons != null) {
            state.currentEditedAnswerButtons = answerButtons
        }
    },
    addNewAnswerButton: (state) => {
        const newAnswerButton = {
            title: "",
            value: "",
            type: buttonTypes.openUrl,
            identificator: null,
            virtualIntent: null
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
    },
    setTitleDuplicate: (state, titleDuplicate) => {
        state.buttonValidations.titleDuplicate = titleDuplicate
    },
    setInputEmpty: (state, inputEmpty) => {
        state.buttonValidations.inputEmpty = inputEmpty
    },
    setInvalidUrl: (state, urlInvalid) => {
        state.buttonValidations.invalidUrl = urlInvalid
    }
}

const actions = {
    resetStateAndSaveCopyOfButtons: ({ commit }, answerButtons) => {
        const copyAnswerButtons = JSON.parse(JSON.stringify(answerButtons))
        commit(mutations.resetStateAndSaveCopyOfButtons.name, copyAnswerButtons)
    },
    addNewAnswerButton: ({ commit }) => {
        commit(mutations.addNewAnswerButton.name)
    },
    deleteAnswerButton: ({ commit }, answerButton) => {
        commit(mutations.deleteAnswerButton.name, answerButton)
    },
    setTitleDuplicate: ({ commit }, titleDuplicate) => {
        commit(mutations.setTitleDuplicate.name, titleDuplicate)
    },
    setInputEmpty: ({ commit }, inputEmpty) => {
        commit(mutations.setInputEmpty.name, inputEmpty)
    },
    setInvalidUrl: ({ commit }, urlInvalid) => {
        commit(mutations.setInvalidUrl.name, urlInvalid)
    }
}

function resetState(state) {
    Object.assign(state, getInitialState())
}

function getInitialState() {
    return {
        deletedAnswerButtonIndexes: [],
        newAnswerButtons: [],
        currentEditedAnswerButtons: [],
        buttonValidations: {
            titleDuplicate: false,
            inputEmpty: false,
            invalidUrl: false
        }
    }
}

function isNewAnswerButton(state, answerButton) {
    return state.newAnswerButtons.includes(answerButton)
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
