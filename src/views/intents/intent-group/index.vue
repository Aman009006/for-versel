<template>
  <div>
    <intentGroupInfobox></intentGroupInfobox>
    <intentSearch :searchableArray="intents" @filteredArray="updateIntents"></intentSearch>
    <div id="intent-hover" class="hidden" @mouseover="displayHover">
      <div class="intent-hover-text"></div>
    </div>
    <el-table :data="filteredArray" stripe @cell-mouse-enter="displayHover" @cell-mouse-leave="hideHover">
      <el-table-column prop="name" label="Name">
      </el-table-column>
      <el-table-column prop="utterances" label="Beispiele / Beschreibung">
      </el-table-column>
      <el-table-column label="Aktion">
        <el-button>
          Öffnen
        </el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import intentGroupInfobox from "./intentGroupInfobox.vue";
import intentSearch from "../../../components/IntentSearch/index.vue"
import MarkdownIt from "markdown-it";
const md = MarkdownIt({ html: false });

export default {
  name: "IntentGroup",
  components: {
    intentGroupInfobox,
    intentSearch,
  },
  props: {
    intents: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filteredArray: this.intents,
    };
  },
  methods: {
    updateIntents(array) {
      this.filteredArray = array;
    },
    displayHover(row) {
      const intentContainer = document.getElementById('intent-hover');
      const intentContainerText = intentContainer.getElementsByClassName('intent-hover-text')[0];
      intentContainer.classList.remove('hidden');
      if (row.texts) {
        intentContainerText.innerHTML = md.render(
          this.truncateString(row.texts[0].text, 20)
        );
      } else {
        intentContainerText.innerHTML = '<p>Keine Antwort hinterlegt...</p>';
      }
    },
    hideHover() {
      const intentContainer = document.getElementById('intent-hover');
      intentContainer.classList.add('hidden');
    },
    truncateString(string, maxWords) {
      const array = string.split(" ");
      const wordCount = array.length;
      string = array.splice(0, maxWords).join(" ");

      if (wordCount > maxWords) {
        string += "...";
      }

      return string;
    }
  }
};
</script>

<style lang="scss" scoped>
#intent-hover {
  position: fixed;
  bottom: 20px;
  width: 70%;
  height: 100px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  overflow-y: hidden;
  z-index: 100;

  h3,
  p {
    margin: 0;
  }
}

.hidden {
  display: none;
}
</style>
