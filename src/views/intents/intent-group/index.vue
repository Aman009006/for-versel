<template>
  <div>
    <intentGroupInfoBox :headline="headline"></intentGroupInfobox>
    <intentSearch searchScope="intents" :searchableArray="intents" @filteredArray="updateIntents"></intentSearch>
    <div id="intent-hover" class="hidden">
      <div class="intent-hover-text"></div>
    </div>
    <el-table :data="filteredArray" stripe @row-click="toggleHover">
      <el-table-column prop="name" label="Name">
      </el-table-column>
      <el-table-column prop="description" label="Beispiele / Beschreibung">
      </el-table-column>
      <el-table-column prop="name" label="Aktion">
        <template v-slot="{ row }">
          <a :href="parsePath(row.name)">
            <el-button>
              Öffnen
            </el-button>
          </a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import intentGroupInfoBox from "./intentGroupInfoBox.vue";
import intentSearch from "../../../components/IntentSearch/index.vue"
import { encodePathComponent } from '@/store/modules/permission'
import MarkdownIt from "markdown-it";
const md = MarkdownIt({ html: false });

export default {
  name: "IntentGroup",
  components: {
    intentGroupInfoBox,
    intentSearch,
  },
  props: {
    headline: {
      type: String,
      required: true,
    },
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
  mounted() {
    this.addActiveToSidebar();
  },
  unmounted() {
    this.removeActiveFromSidebar();
  },
  methods: {
    updateIntents(array) {
      this.filteredArray = array;
    },
    toggleHover(row) {
      const intentContainer = document.getElementById('intent-hover');
      const intentContainerText = intentContainer.getElementsByClassName('intent-hover-text')[0];
      intentContainer.classList.toggle('hidden');
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
    },
    parsePath(path) {
      const basePath = this.$router.currentRoute.value.href;
      return `${basePath}/${encodeURIComponent(encodePathComponent(path))}`
    },
    addActiveToSidebar()  {
      const intentContainer = document.getElementsByClassName('is-intent')[0];
      intentContainer.classList.add('is-active');
    },
    removeActiveFromSidebar() {
      const intentContainer = document.getElementsByClassName('is-intent')[0];
      intentContainer.classList.remove('is-active');
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
