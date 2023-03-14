import DialogInfoBox from '../../../../../src/components/Dialogs/DialogInfoBox/index.vue';
import VueTestUtils from '../../../../utils/VueTestUtils';

export default class DialogInfoBoxTestUtils {
    createTestObjectWithDescription(description) {
        const testUtils = this.#createVueTestUtil();
        return testUtils.createTestObject({
            props: {
                description,
                entity: {}
            }
        });
    }

    #createVueTestUtil() {
        return new VueTestUtils(DialogInfoBox);
    }
}
