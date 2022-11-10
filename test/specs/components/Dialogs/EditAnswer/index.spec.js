import { expect, it, describe } from 'vitest';
import { answerConfigSimple, answer, answerConfigMulti } from '../../../../mocks/answerMocks';
import EditAnswerTestUtils from './EditAnswerTestUtils';

describe('check ButtonTable in EditAnswer', async () => {
    it('intent with type simple doesnt contain a ButtonTable', function () {
        const testObject = EditAnswerTestUtils.createTestObject(answerConfigSimple, answer);
        const divButtonTable = testObject.element.querySelector("#tableButtonContainer")
        expect(divButtonTable).to.be.null
    });

    it('intent with type multi contains a ButtonTable', function () {
        const testObject = EditAnswerTestUtils.createTestObject(answerConfigMulti, answer);
        const divButtonTable = testObject.element.querySelector("#tableButtonContainer")
        expect(divButtonTable).to.be.not.null
    });
})

