
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
    }
}

export default defaultConfig;
