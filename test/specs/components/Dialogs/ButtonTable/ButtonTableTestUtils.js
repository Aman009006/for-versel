import VueTestUtils from '../../../../utils/VueTestUtils';
import ButtonTable from '../../../../../src/components/Dialogs/ButtonTable/index.vue';
import { buttons, answerConfigMulti } from '../../../../mocks/answerMocks'

export default class ButtonTableTestUtils {
    static createTestUtilMulti() {
        return ButtonTableTestUtils.#createVueTestUtil(answerConfigMulti);
    }

    static #createVueTestUtil(answerConfig) {
        const testUtil = new VueTestUtils(ButtonTable)
        return testUtil.createTestObject({
            props: {
                buttons,
                answerConfig
            }
        });
    }
}