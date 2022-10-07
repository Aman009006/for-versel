import { defineConfig } from 'vite'
import ckEditorSvg from './vite/plugins/ckEditorSvg';
import ckEditorIgnoreCss from './vite/plugins/ckEditorIgnoreCss';
import vue from '@vitejs/plugin-vue'
import dns from 'dns'
import { resolve } from 'path';

useLocalHost();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), ckEditorSvg(), ckEditorIgnoreCss()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 9527,
        strictPort: true
    },
    build: {
        chunkSizeWarningLimit: 2000
    },
    test: {
        environment: 'jsdom'
    }
})

function useLocalHost() {
    dns.setDefaultResultOrder('verbatim');
}
