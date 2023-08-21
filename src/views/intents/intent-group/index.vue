<template>
  <div>
    <intentGroupInfobox></intentGroupInfobox>
    <intentSearch :searchableArray="intents" @filteredArray="updateIntents"></intentSearch>
    <div id="intent-hover" class="hidden">
      <h3>Antwort Vorschau:</h3>
      <p class="intent-hover-text"></p>
    </div>
    <el-table :data="filteredArray" stripe>
      <el-table-column label="Name">
        <template #default="scope">
          <el-row @mousemove="positionHoverAtMouse" @mouseover="displayHover(scope.row)" @mouseout="hideHover()">
            {{ scope.row.name }}
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="Beispiele / Beschreibung">
        <template #default="scope">
          <el-row @mousemove="positionHoverAtMouse" @mouseover="displayHover(scope.row)" @mouseout="hideHover()">
            {{ scope.row.utterances }}
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="Aktion">
        <template #default="scope">
          <el-button @mousemove="positionHoverAtMouse" @mouseover="displayHover(scope.row)" @mouseout="hideHover()">
            Öffnen
          </el-button>
        </template>
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
      this.positionHoverAtMouse(event);
      intentContainer.classList.remove('hidden');
      if (row.texts) {
        intentContainerText.innerHTML = md.render(
          this.truncateString(row.texts[0].text, 20)
        );
      } else {
        intentContainerText.innerHTML = 'Keine Antwort hinterlegt...';
      }
    },
    hideHover() {
      const intentContainer = document.getElementById('intent-hover');
      intentContainer.classList.add('hidden');
    },
    positionHoverAtMouse(e) {
      const intentContainer = document.getElementById('intent-hover');
      intentContainer.style.top = (e.clientY - 50) + 'px';
      intentContainer.style.left = (e.clientX - 200) + 'px';
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
  position: absolute;
  width: auto;
  max-width: 40%;
  height: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  overflow-y: hidden;
  z-index: 100;
}

.hidden {
  display: none;
}
</style>
