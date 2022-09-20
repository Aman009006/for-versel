import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dns from 'dns'
import { resolve } from 'path';

useLocalHost();

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 9527,
        strictPort: true
    }
})

function useLocalHost() {
    dns.setDefaultResultOrder('verbatim');
}
