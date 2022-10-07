import DialogInfoBox from '../../../../../src/components/Dialogs/DialogInfoBox/index.vue';
import { expect, it, describe } from 'vitest';
import VueTestUtils from '../../../../utils/VueTestUtils';

describe('DialogInfoBox', async () => {
    it('should show provided description', function () {
        const description = "this is my test - description";
        const testObject = createTestObjectWithDescription(description);
        const descriptionElement = testObject.element.querySelector('.description');
        expect(descriptionElement.innerHTML).to.equal(description);
    });
})

function createTestObjectWithDescription(description) {
    const testUtils = createVueTestUtil();
    const testObject = testUtils.createTestObject({
        props: {
            description
        }
    });
    return testObject;
}

function createVueTestUtil() {
    return new VueTestUtils(DialogInfoBox);
}
