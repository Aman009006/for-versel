import { buttonTypes } from '@/constants';

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
        titles.sort();
        var last = titles[0];
        for (var i = 1; i < titles.length; i++) {
            if (titles[i] == last) {
                return true;
            }
            last = titles[i];
        }
        return false;
    }

    hasEmptyInputs() {
        return this.buttons.some((button) => {
            return button.title === "" || button.value === "";
        });
    }

    hasInvalidUrlButtons() {
        return this.buttons.some(
            (button) => ButtonValidatorImpl.isInvalidUrlButton(button)
        );
    }

    static isInvalidUrlButton(button) {
        if (this.isOpenUrlButton(button)) {
            return !this.isValidUrl(button.value);
        }
        return false;
    }

    static isOpenUrlButton(button) {
        return button.type == buttonTypes.openUrl
    }

    static isValidUrl(url) {
        return /^https?:\/\/.+/.test(url)
    }
}
