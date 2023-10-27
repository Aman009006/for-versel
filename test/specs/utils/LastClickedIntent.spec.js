import { afterEach, describe, test, expect } from 'vitest';
import LastClickedIntent from "@/utils/LastClickedIntent";
import { lastClickedIntentData } from "../../mocks/answerMocks";

afterEach(() => sessionStorage.clear());

describe('LastClickedIntentTests', function () {
    const lastClickedIntent = new LastClickedIntent(lastClickedIntentData.virtualIntentName, lastClickedIntentData.intentGroup);
    const lastClickedIntentFalseGroup = new LastClickedIntent(lastClickedIntentData.virtualIntentName, lastClickedIntentData.intentGroupFalse);
    test('addDataToSession', function () {
        lastClickedIntent.addDataToSession();
        expect(sessionStorage.getItem('lastClickedVirtualIntent')).toBe(lastClickedIntentData.virtualIntentName);
        expect(sessionStorage.getItem('lastClickedIntentGroup')).toBe(lastClickedIntentData.intentGroup);
    });
    test('handleScrollProcess', function () {
        lastClickedIntent.addDataToSession();
        expect(lastClickedIntentFalseGroup.handleScrollProcess()).toBe(false);
    });
});