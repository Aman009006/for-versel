import "@ckeditor/ckeditor5-heading/build/translations/de.js";
import "@ckeditor/ckeditor5-basic-styles/build/translations/de.js";
import "@ckeditor/ckeditor5-list/build/translations/de.js";
import "@ckeditor/ckeditor5-source-editing/build/translations/de.js";

import { add } from "@ckeditor/ckeditor5-utils/src/translation-service";

export default function activateCkEditorTranslations() {
    add('de', {
        'Undo': 'Rückgängig',
        'Redo': 'Wiederherstellen'
    })
}
