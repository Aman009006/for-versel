
/**
 * All the ckEditor css is included in the code by
 * a static css (ckEditor.css).
 * Therfore we need to ignore the css imports from ckEditor.
 * This Plugin filters out all css - imports from ckeditor
 * packages.
 */
export default function ckEditorIgnoreCss() {
    return {
        name: ckEditorIgnoreCss.name,
        transform(src, filePath) {
            if (isCkEditorCss(filePath)) {
                return {
                    code: ""
                }
            }
        }
    }
}

function isCkEditorCss(filePath) {
    const ckEditorSvgRegex = /ckeditor5-(.+)(.css)$/
    return ckEditorSvgRegex.test(filePath)
}
