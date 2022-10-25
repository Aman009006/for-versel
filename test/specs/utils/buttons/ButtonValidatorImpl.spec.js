import ButtonValidatorImpl from '@/utils/buttons/ButtonValidatorImpl';
import { expect, it, describe } from 'vitest';

const buttons = {
    buttonA: {
        title: 'a'
    },
    buttonB: {
        title: 'b'
    }
}

describe(ButtonValidatorImpl.name, function () {
    it('finds dupplicate titles', function () {
        const dupplicateButtons = [buttons.buttonA, buttons.buttonA];
        const hasDupplicates = findsDupplicateTitles(dupplicateButtons);
        expect(hasDupplicates).to.be.true;
    })

    it('doesn\'t find dupplicate titles when there are no dupplicates', function () {
        const nonDupplicateButtons = [buttons.buttonA, buttons.buttonB];
        const hasDupplicates = findsDupplicateTitles(nonDupplicateButtons);
        expect(hasDupplicates).to.be.true;
    });
})

function findsDupplicateTitles(buttons) {
    const buttonValidator = new ButtonValidatorImpl(buttons);
    return buttonValidator.hasDuplicateTitles();
}
