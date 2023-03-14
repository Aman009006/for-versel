import DialogInfoBox from '../../../../../src/components/Dialogs/DialogInfoBox/index.vue';
import VueTestUtils from '../../../../utils/VueTestUtils';

/**
 * @typedef {import('@vue/test-utils')['mount']} mount
 * @typedef {Parameters<mount>[1]} Options
 * @typedef {ReturnType<mount>} TestObject
 */
export default class DialogInfoBoxTestUtils {
    createTestObjectWithDescription(description) {
        return this.createTestObject({
            props: this.getValidProps({
                description,
            }),
        });
    }

    /**
     * @param {Options} [options]
     */
    createTestObject(options) {
        const testUtils = this.#createVueTestUtil();
        if (options == null) {
            options = {
                props: this.getValidProps()
            }
        }
        return testUtils.createTestObject(options);
    }

    /**
     * @param {TestObject} testObject
     */
    getTestButtonContainer(testObject) {
        return testObject.element.querySelector(".testButtonContainer");
    }

    getValidProps(props) {
        return {
            entity: {},
            ...props
        }
    }

    #createVueTestUtil() {
        return new VueTestUtils(DialogInfoBox);
    }
}
