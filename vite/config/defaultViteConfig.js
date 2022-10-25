import ckEditorSvg from '../plugins/ckEditorSvg';
import ckEditorIgnoreCss from '../plugins/ckEditorIgnoreCss';
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import defaultVitestConfig from './test/defaultVitestConfig'

/**
 * @typedef {import('vite').UserConfig} UserConfig
 * @type {UserConfig}
 */
const defaultViteConfig = {
    plugins: [vue(), ckEditorSvg(), ckEditorIgnoreCss()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "../../src"),
        },
    },
    server: {
        port: 9527,
        strictPort: true
    },
    build: {
        chunkSizeWarningLimit: 2000
    },
    test: defaultVitestConfig
}

export default defaultViteConfig;
