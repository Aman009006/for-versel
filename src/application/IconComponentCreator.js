import SvgIcon from '@/components/SvgIcon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default class IconComponentCreator {
    static getIconComponents() {
        const components = {
            SvgIcon,
            ...this.#getElementPlusIcons()
        }
        return components;
    }

    static #getElementPlusIcons() {
        const icons = {};
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            const iconName = this.#createIconComponentName(key)
            icons[iconName] = component;
        }
        return icons;
    }

    /**
     * We want the icons to be scoped, so that the usage of icons is
     * more semantic.
     */
    static #createIconComponentName(key) {
        return 'icon-' + key
    }
}
