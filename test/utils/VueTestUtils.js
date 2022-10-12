import { mount } from '@vue/test-utils';

import store from '../../src/store/index'
import element from 'element-plus'

/**
 * @typedef {import('@vue/test-utils')['mount']} mount
 * @typedef {Parameters<mount>[0]} Component
 * @typedef {Parameters<mount>[1]} Options
 * @typedef {ReturnType<mount>} TestObject
 */

export default class VueTestUtils {
    /**
     * @param {Component} component
     */
    constructor(component) {
        /** @type {Component} */
        this.component = component;
    }

    /**
     * @param {Options} options
     * @returns {TestObject}
     */
    createTestObject(options) {
        return mount(this.component, {
            global: {
                plugins: [store, element]
            },
            ...options
        })
    }
}
