import { createApp } from 'vue'
import Element from 'element-plus'
import enLang from 'element-plus/es/locale/lang/en'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

import App from '../App.vue'
import store from '../store'
import router from '../router'

export default class ApplicationCreator {
    static createApp() {
        const application = createApp(App);
        this.#addPlugins(application);
        this.#addIconComponents(application);
        return application;
    }

    static #addPlugins(app) {
        app.use(Element, {
            size: 'default',
            locale: enLang
        })
        app.use(store)
        app.use(router)
    }

    static #addIconComponents(app) {
        app.component('SvgIcon', SvgIcon)
        this.#addElementPlusIcons(app)
    }

    static #addElementPlusIcons(app) {
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            const iconName = this.#createIconComponentName(key)
            app.component(iconName, component)
        }
    }

    /**
     * We want the icons to be scoped, so that the usage of icons is
     * more semantic.
     */
    static #createIconComponentName(key) {
        return 'icon-' + key
    }
}
