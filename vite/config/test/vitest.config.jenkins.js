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
            /**
             * @see https://github.com/vitest-dev/vitest/issues/2204
             */
            reporters: 'tap'
        }
    }
)
