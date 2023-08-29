
/**
 * @typedef {import('./VitestConfig').default} VitestConfig
 * @type {VitestConfig}
 */
const defaultConfig = {
    environment: 'jsdom',
    deps: {
        optimizer: {
            web: {
                include: [
                    'node_modules/@ckeditor/ckeditor5-*/**/*',
                ]
            }
        }
    },
    setupFiles: [
        "./vite/config/test/setupFile.js"
    ]
}

export default defaultConfig;
