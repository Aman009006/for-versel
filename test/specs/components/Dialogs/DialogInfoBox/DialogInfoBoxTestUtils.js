import DialogInfoBox from '../../../../../src/components/Dialogs/DialogInfoBox/index.vue';
import VueTestUtils from '../../../../utils/VueTestUtils';

/**
 * @typedef {import('@vue/test-utils')['mount']} mount
 * @typedef {Parameters<mount>[1]} Options
 */
export default class DialogInfoBoxTestUtils {
    createTestObjectWithDescription(description) {
        return this.createTestObject({
            props: {
                description,
                entity: {}
            },
        });
    }

    /**
     * @param {Options} options
     */
    createTestObject(options) {
        const testUtils = this.#createVueTestUtil();
        return testUtils.createTestObject(options);
    }

    #createVueTestUtil() {
        return new VueTestUtils(DialogInfoBox);
    }
}
