<template>
  <div>
    <div ref="ckEditor" />
  </div>
</template>

<script>
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import Image from "@ckeditor/ckeditor5-image/src/image.js";
import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsertviaurl.js";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption.js";
import Link from "@ckeditor/ckeditor5-link/src/link.js";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import SourceEditing from "@ckeditor/ckeditor5-source-editing/src/sourceediting.js";
import MarkDown from "@ckeditor/ckeditor5-markdown-gfm/src/markdown.js";
import AutoLink from "@ckeditor/ckeditor5-link/src/autolink";
import Table from "@ckeditor/ckeditor5-table/src/table";

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
  Italic,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  Link,
  AutoLink,
  List,
  SourceEditing,
  Table,
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
      "bulletedList",
      "numberedList",
      "|",
      "undo",
      "redo",
      "|",
      "sourceEditing",
      "|"
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

.ck-editor {
  a {
    text-decoration: underline;
    color: blue;
    &:hover {
      color: lightblue;
    }
  }
  /*
  svg - images are not rendering correctly without
  a min-width. An example can be found in
  https://hsagchatbot.atlassian.net/browse/CHAT-686
  */
  .image-inline {
    img {
      min-width: 70px;
    }
  }
}
</style>
