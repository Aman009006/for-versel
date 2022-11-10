import EditAnswer from '../../../../../src/components/Dialogs/EditAnswer/index.vue';
import VueTestUtils from '../../../../utils/VueTestUtils';

export default class EditAnswerTestUtils {
    static createTestObject(answerConfig, answer) {
        const testUtils = EditAnswerTestUtils.#createVueTestUtil();
        const testObject = testUtils.createTestObject({
            props: {
                answer,
                answerConfig
            }
        });
        return testObject;
    }

    static #createVueTestUtil() {
        return new VueTestUtils(EditAnswer);
    }
}
