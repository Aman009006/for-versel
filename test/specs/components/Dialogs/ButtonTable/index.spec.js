import { expect, it, describe } from 'vitest';
import ButtonTableTestUtils from './ButtonTableTestUtils';

describe("ButtonTable", async () => {
    it("show addAnswerButton", function () {
        const testUtilObject = ButtonTableTestUtils.createTestUtilMulti()
        const addAnswerButton = testUtilObject.element.querySelector(".addAnswerButton")
        expect(addAnswerButton).to.be.not.null
    })
})