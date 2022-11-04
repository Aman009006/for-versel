import { defineConfig } from 'vite'
import dns from 'dns'
import defaultViteConfig from './vite/config/defaultViteConfig';

useLocalHost();

// https://vitejs.dev/config/
export default defineConfig(defaultViteConfig)

function useLocalHost() {
    dns.setDefaultResultOrder('verbatim');
}
