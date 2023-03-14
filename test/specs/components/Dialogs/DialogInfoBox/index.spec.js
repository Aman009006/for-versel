import { expect, it, describe } from 'vitest';
import DialogInfoBoxTestUtils from './DialogInfoBoxTestUtils';

const dialogInfoBoxTestUtils = new DialogInfoBoxTestUtils();
const testIntentButtonText = "Antwort im Bot prüfen";

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
            const testButtonContainer = dialogInfoBoxTestUtils.getTestButtonContainer(testObject);
            const hasIntentTestButton = testButtonContainer.innerHTML.includes(testIntentButtonText);
            expect(hasIntentTestButton).to.be.false;
        })

        it(`shows the "${testIntentButtonText}" - Button when a adminUiTestPageLink was not provided`, function () {
            const testObject = dialogInfoBoxTestUtils.createTestObject();
            const testButtonContainer = dialogInfoBoxTestUtils.getTestButtonContainer(testObject);
            const hasIntentTestButton = testButtonContainer.innerHTML.includes(testIntentButtonText);
            expect(hasIntentTestButton).to.be.true;
        })
    })
})
