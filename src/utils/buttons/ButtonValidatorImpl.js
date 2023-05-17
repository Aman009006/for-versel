import { buttonLimit, buttonTypes } from '@/constants';

/**
 * @typedef { import('./ButtonValidator').default } ButtonValidator
 * @implements {ButtonValidator}
 */
export default class ButtonValidatorImpl {
    constructor(buttons) {
        this.buttons = buttons;
    }

    hasDuplicateTitles() {
        const titles = this.buttons.map((button) => button.title);
        return ButtonValidatorImpl.checkForDuplicates(titles);
    }

    hasEmptyInputs() {
        return this.buttons.some((button) => {
            if (ButtonValidatorImpl.isMessageBackButton(button)) {
                return button.title === "" || button?.virtualIntent == null;
            } else {
                return button.title === "" || button.value === "";
            }
        });
    }

    hasInvalidUrlButtons() {
        return this.buttons.some(
            (button) => ButtonValidatorImpl.isInvalidUrlButton(button)
        );
    }

    hasDuplicateOrders() {
        const orders = this.buttons.map((button) => button.order);
        return ButtonValidatorImpl.checkForDuplicates(orders);
    }

    hasButtonLimitReached() {
        return this.buttons.length > buttonLimit;
    }

    static checkForDuplicates(objectList) {
        objectList.sort();
        var last = objectList[0];
        for (var i = 1; i < objectList.length; i++) {
            if (objectList[i] == last) {
                return true;
            }
            last = objectList[i];
        }
        return false;
    }

    static isInvalidUrlButton(button) {
        if (this.isOpenUrlButton(button)) {
            return !this.isValidUrlOrPlaceholder(button.value)
        }
        return false;
    }

    static isOpenUrlButton(button) {
        return button.type == buttonTypes.openUrl
    }

    static isValidUrlOrPlaceholder(buttonValue) {
        if (buttonValue.slice(0, 2) == '##') {
            return this.isValidPlaceholder(buttonValue)
        } else {
            return this.isValidUrl(buttonValue)
        }
    }

    static isValidUrl(url) {
        return /^https?:\/\/.+/.test(url);
    }

    static isValidPlaceholder(placeholder) {
        return /^##\S+##$/.test(placeholder);
    }

    static isMessageBackButton(button) {
        return button.type == buttonTypes.messageBack;
    }
}

