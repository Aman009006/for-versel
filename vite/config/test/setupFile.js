
import { beforeAll } from "vitest";

beforeAll(() => {
    /**
     * CkEditor uses the resizeObserver.
     * jsdom doesn't implement this observer.
     * Therfore we have to mock it.
     * @see https://github.com/jsdom/jsdom/issues/3368#issuecomment-1147970817
     */
    global.ResizeObserver = class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
});
