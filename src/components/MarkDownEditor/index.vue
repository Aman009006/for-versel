<template>
  <div id="app">
    <ckeditor
      v-model="copiedText"
      :editor="editor"
      :config="editorConfig"
      @ready="onReady(editor)"
    />
  </div>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue2";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import Image from "@ckeditor/ckeditor5-image/src/image.js";
import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsert.js";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption.js";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
import Link from "@ckeditor/ckeditor5-link/src/link.js";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import SourceEditing from "@ckeditor/ckeditor5-source-editing/src/sourceediting.js";
import MarkDown from "@ckeditor/ckeditor5-markdown-gfm/src/markdown.js";

export default {
  name: "MarkDownEditor",
  components: { ckeditor: CKEditor.component },
  props: { text: { type: String } },
  data() {
    return {
      editor: Editor,
      editorConfig: {
        // The configuration of the editor.
      },
      copiedText: this.text,
    };
  },
  methods: {
    onReady(editor) {
      // Insert the toolbar before the editable area.
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    },
  },
};

class Editor extends ClassicEditor {}

// Plugins to include in the build.
Editor.builtinPlugins = [
  Bold,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  Italic,
  Link,
  List,
  SourceEditing,
  MarkDown,
  ImageInsert,
];

// Editor configuration.
Editor.defaultConfig = {
  toolbar: {
    items: [
      "heading",
      "bold",
      "italic",
      "link",
      "linkimage",
      "bulletedList",
      "numberedList",
      "|",
      "undo",
      "redo",
      "|",
      "sourceEditing",
      "|",
      "imageInsert",
    ],
  },
  image: {
    toolbar: ["imageTextAlternative"],
  },
};
</script>

