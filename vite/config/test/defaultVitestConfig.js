
/**
 * @typedef {import('./VitestConfig').default} VitestConfig
 * @type {VitestConfig}
 */
const defaultConfig = {
    environment: 'jsdom',
    deps: {
        inline: [
            /@ckeditor\/.+/
        ]
    },
    setupFiles: [
        "./vite/config/test/setupFile.js"
    ]
}

export default defaultConfig;
