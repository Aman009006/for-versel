import { createApp } from 'vue'
import Element from 'element-plus'
import enLang from 'element-plus/es/locale/lang/en'

import App from '../App.vue'
import store from '../store'
import router from '../router'
import IconComponentCreator from './IconComponentCreator'

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
        const iconComponents = IconComponentCreator.getIconComponents();
        for (const componentName in iconComponents) {
            const component = iconComponents[componentName];
            app.component(componentName, component);
        }
    }
}
