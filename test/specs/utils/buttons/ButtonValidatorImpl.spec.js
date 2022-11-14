import ButtonValidatorImpl from '@/utils/buttons/ButtonValidatorImpl';
import { expect, it, describe } from 'vitest';
import { buttonTypes } from '@/constants';

const buttonsTitleValidation = {
    buttonA: {
        title: 'a'
    },
    buttonB: {
        title: 'b'
    }
}

const buttonsOpenUrlValidation = {
    buttonA: {
        title: 'a',
        value: '##portalUrl##',
        type: buttonTypes.openUrl
    },
    buttonB: {
        title: 'b',
        value: 'https://www.google.de',
        type: buttonTypes.openUrl
    },
    buttonC: {
        title: 'c',
        value: '##portalUrl##aaasdw',
        type: buttonTypes.openUrl
    },
    buttonD: {
        title: 'd',
        value: 'hps://www.google.de',
        type: buttonTypes.openUrl
    },
}

describe(ButtonValidatorImpl.name, function () {
    it('finds dupplicate titles', function () {
        const dupplicateButtons = [buttonsTitleValidation.buttonA, buttonsTitleValidation.buttonA];
        const hasDupplicates = findsDupplicateTitles(dupplicateButtons);
        expect(hasDupplicates).to.be.true;
    })

    it('doesn\'t find dupplicate titles when there are no dupplicates', function () {
        const nonDupplicateButtons = [buttonsTitleValidation.buttonA, buttonsTitleValidation.buttonB];
        const hasDupplicates = findsDupplicateTitles(nonDupplicateButtons);
        expect(hasDupplicates).to.be.false;
    });

    it('check openUrl validation with valid buttons', function() {
        const validButtons = [buttonsOpenUrlValidation.buttonA, buttonsOpenUrlValidation.buttonB];
        const validation = findsInvalidOpenUrlButtons(validButtons);
        expect(validation).to.be.false;
    })

    it('check openUrl validation with invalid buttons', function() {
        const validButtons = [buttonsOpenUrlValidation.buttonC, buttonsOpenUrlValidation.buttonD];
        const validation = findsInvalidOpenUrlButtons(validButtons);
        expect(validation).to.be.true;
    })

    it('check openUrl validation with valid and invalid buttons', function() {
        const validButtons = [buttonsOpenUrlValidation.buttonA, buttonsOpenUrlValidation.buttonC];
        const validation = findsInvalidOpenUrlButtons(validButtons);
        expect(validation).to.be.true;
    })
})

function findsDupplicateTitles(buttons) {
    const buttonValidator = getButtonValidator(buttons);
    return buttonValidator.hasDuplicateTitles();
}

function findsInvalidOpenUrlButtons(buttons) {
    const buttonValidator = getButtonValidator(buttons);
    return buttonValidator.hasInvalidUrlButtons();
}

function getButtonValidator(buttons) {
    return new ButtonValidatorImpl(buttons);
}