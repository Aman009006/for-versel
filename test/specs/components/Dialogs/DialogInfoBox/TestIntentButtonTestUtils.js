
/**
 * @typedef {import('@vue/test-utils')['mount']} mount
 * @typedef {ReturnType<mount>} TestObject
 */
export default class TestIntentButtonTestUtils {
    /**
     * @param {TestObject} testObject
     */
    getTestButtonContainer(testObject) {
        return testObject.element.querySelector(".testButtonContainer");
    }
}
