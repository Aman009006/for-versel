<template>
  <div ref="ckEditor" />
</template>

<script>
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
import AutoLink from "@ckeditor/ckeditor5-link/src/autolink";

export default {
  name: "MarkDownEditor",
  props: {
    text: { type: String },
  },
  data() {
    return {
      editor: null,
    };
  },
  async mounted() {
    const ckEditorElement = this.$refs.ckEditor;
    const editor = await Editor.create(ckEditorElement, {
      initialData: this.text,
    });
    this.editor = editor;
  },
  methods: {
    /**
     * This method is considered to be "public". The parent may use this
     * method to get the current data of the editor.
     */
    getData() {
      return this.editor?.getData();
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
  AutoLink,
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

<style lang="scss">
:root {
  --ck-z-modal: 1002;
}

a {
  text-decoration:underline;
  color: blue;
}

a:hover {
    color: lightblue;
}
</style>