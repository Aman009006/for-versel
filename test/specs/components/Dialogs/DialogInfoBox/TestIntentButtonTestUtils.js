
/**
 * @typedef {import('@vue/test-utils')['mount']} mount
 * @typedef {ReturnType<mount>} TestObject
 */
export default class TestIntentButtonTestUtils {
    static testIntentButtonText = "Antwort im Bot prüfen";

    /** @param {TestObject} testObject */
    hasIntentTestButton(testObject) {
        const testButtonContainer = this.#getTestButtonContainer(testObject);
        return testButtonContainer.innerHTML.includes(
            TestIntentButtonTestUtils.testIntentButtonText
        );
    }

    /** @param {TestObject} testObject */
    #getTestButtonContainer(testObject) {
        return testObject.element.querySelector(".testButtonContainer");
    }
}
