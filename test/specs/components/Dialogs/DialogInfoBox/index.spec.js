import { expect, it, describe } from 'vitest';
import DialogInfoBoxTestUtils from './testUtils/DialogInfoBoxTestUtils';
import TestIntentButtonTestUtils from './testUtils/TestIntentButtonTestUtils';

const dialogInfoBoxTestUtils = new DialogInfoBoxTestUtils();
const testIntentButtonTestUtils = new TestIntentButtonTestUtils();
const testIntentButtonText = TestIntentButtonTestUtils.testIntentButtonText;

describe('DialogInfoBox', async () => {
    it('should show provided description', function () {
        const description = "this is my test - description";
        const testObject = dialogInfoBoxTestUtils.createTestObjectWithDescription(description);
        const descriptionElement = testObject.element.querySelector('.description');
        expect(descriptionElement.innerHTML).to.equal(description);
    });

    describe(testIntentButtonText, function () {
        it(`doesn\'t show the "${testIntentButtonText}" - Button when a adminUiTestPageLink was provided`, function () {
            const testObject = dialogInfoBoxTestUtils.createTestObject({
                props: dialogInfoBoxTestUtils.getValidProps({
                    adminUiTestPageLink: "https://www.test.com"
                })
            });
            const hasIntentTestButton = testIntentButtonTestUtils.hasIntentTestButton(testObject);
            expect(hasIntentTestButton).to.be.false;
        })

        it(`shows the "${testIntentButtonText}" - Button when a adminUiTestPageLink was not provided`, function () {
            const testObject = dialogInfoBoxTestUtils.createTestObject();
            const hasIntentTestButton = testIntentButtonTestUtils.hasIntentTestButton(testObject);
            expect(hasIntentTestButton).to.be.true;
        })
    })
})
