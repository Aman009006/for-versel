
export default class ButtonUtilities {
    static answerButtonsModulePrefix = "answerButtons/";
    static dispatchNames = {
        setTitleDuplicate: ButtonUtilities.answerButtonsModulePrefix + "setTitleDuplicate",
        setInputEmpty: ButtonUtilities.answerButtonsModulePrefix + "setInputEmpty",
        setInvalidUrl: ButtonUtilities.answerButtonsModulePrefix + "setInvalidUrl",
    }

    /**
     * @typedef { import('@/utils/buttons/ButtonValidator').default } ButtonValidator
     * @param { ButtonValidator } buttonValidator
     */
    constructor(store, buttonValidator) {
        this.store = store;
        /**  @type { ButtonValidator } */
        this.buttonValidator = buttonValidator;
    }

    static areButtonsValid(store) {
        const { buttonValidations } = store.getters;
        return (
            !buttonValidations.titleDuplicate && !buttonValidations.inputEmpty && !buttonValidations.invalidUrl
        );
    }

    validateButtonsAndSaveStateInStore() {
        this.#saveDuplicateTitles();
        this.#saveEmptyInputs();
        this.#saveInvalidUrlButtons();
    }

    #saveDuplicateTitles() {
        const hasDupplicateTitles = this.buttonValidator.hasDuplicateTitles();
        this.store.dispatch(ButtonUtilities.dispatchNames.setTitleDuplicate, hasDupplicateTitles);
    }

    #saveEmptyInputs() {
        const hasEmptyInputs = this.buttonValidator.hasEmptyInputs();
        this.store.dispatch(ButtonUtilities.dispatchNames.setInputEmpty, hasEmptyInputs);
    }

    #saveInvalidUrlButtons() {
        const urlInvalid = this.buttonValidator.hasInvalidUrlButtons();
        this.store.dispatch(ButtonUtilities.dispatchNames.setInvalidUrl, urlInvalid);
    }
}
