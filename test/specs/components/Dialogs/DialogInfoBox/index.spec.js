import { expect, it, describe } from 'vitest';
import DialogInfoBoxTestUtils from './DialogInfoBoxTestUtils';

const dialogInfoBoxTestUtils = new DialogInfoBoxTestUtils();

describe('DialogInfoBox', async () => {
    it('should show provided description', function () {
        const description = "this is my test - description";
        const testObject = dialogInfoBoxTestUtils.createTestObjectWithDescription(description);
        const descriptionElement = testObject.element.querySelector('.description');
        expect(descriptionElement.innerHTML).to.equal(description);
    });
})
