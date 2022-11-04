import { defineConfig } from 'vitest/config'
import defaultVitestConfig from './defaultVitestConfig';
import defaultViteConfig from '../defaultViteConfig'

export default defineConfig(
    {
        ...defaultViteConfig,
        test: {
            ...defaultVitestConfig,
            watch: false,
            allowOnly: false,
        }
    }
)
