import FileHelper from "../helper/FileHelper"

/**
 * inspired by https://github.com/ckeditor/ckeditor5/issues/9807#issuecomment-975792815
 */
export default function ckEditorSvg() {
    return {
        name: ckEditorSvg.name,
        transform(src, filePath) {
            if (isCkEditorSvg(filePath)) {
                return {
                    code: getDefaultSvgExport(filePath)
                }
            }
        }
    }
}

function isCkEditorSvg(filePath) {
    const ckEditorSvgRegex = /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/
    return ckEditorSvgRegex.test(filePath)
}

function getDefaultSvgExport(filePath) {
    const escapedSvg = FileHelper.getEscapedRawContent(filePath)
    return `export default ${escapedSvg}`;
}
