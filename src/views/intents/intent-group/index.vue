<template>
  <div class="intent-group-container">
    <div class="intentgroup-info-container">
      <intentGroupInfoBox :headline="headline"></intentGroupInfobox>
      <intentSearch
        class="intent-search"
        searchScope="intents"
        :searchableArray="intents"
        @filteredArray="updateIntents">
      </intentSearch>
    </div>
    <div id="intent-hover" class="hidden">
      <span class="svg-container" @click="hideHover">
        <svg-icon :svg-icon-html="icons.close" />
      </span>
      <h3>Beispiel Antwort:</h3>
      <div class="intent-hover-text">
      </div>
    </div>
    <el-table
      :data="filteredArray"
      stripe
      @row-click="handleHover"
      :header-cell-style="{ padding: '0 0 0 20px', height: '50px' }"
      :cell-style="{ padding: '0 0 0 20px', height: '80px' }">
      <el-table-column
        prop="name"
        label="Name"
        width="500">
      </el-table-column>
      <el-table-column
        prop="description"
        label="Beispiele / Beschreibung">
      </el-table-column>
      <el-table-column
        label="Aktion"
        width="230">
        <template v-slot="{ row }">
          <a class="intent-group-button" :href="parsePath(row.name)">
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
import { addActiveToSidebar, removeActiveFromSidebar } from "@/utils/sidebar/sidebarUtils";
import icons from "@/icons/index";
import MarkdownIt from "markdown-it";
const md = MarkdownIt({ html: true });

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
      forwarded: false
    };
  },
  mounted() {
    addActiveToSidebar('is-intent');
  },
  unmounted() {
    removeActiveFromSidebar('is-intent');
  },
  computed: {
    icons() {
      return icons;
    },
  },
  methods: {
    updateIntents(array) {
      this.filteredArray = array;
    },
    handleHover(row) {
      const intentContainer = document.getElementById('intent-hover');
      if (intentContainer.getAttribute('data-intent') === row.intent) {
        this.hideHover();
      } else if (intentContainer.classList.contains('hidden')) {
        intentContainer.setAttribute('data-intent', row.intent);
        this.fillHoverText(row.texts)
        this.showHover();
      } else {
        intentContainer.classList.add('hidden');
        setTimeout(() => {
          this.fillHoverText(row.texts)
          this.showHover();
        }, 400);
      }

    },
    hideHover() {
      const intentContainer = document.getElementById('intent-hover');
      intentContainer.classList.add('hidden');
      intentContainer.removeAttribute('data-intent');
    },
    showHover() {
      const intentContainer = document.getElementById('intent-hover');
      intentContainer.classList.remove('hidden');
    },
    fillHoverText(text) {
      const intentContainer = document.getElementById('intent-hover')
      const intentContainerText = intentContainer.getElementsByClassName('intent-hover-text')[0];
      if (text) {
        intentContainerText.innerHTML = md.render(
          this.truncateString(text[0].text, 20)
        );
      } else {
        intentContainerText.innerHTML = '<p>Keine Antwort hinterlegt...</p>';
      }
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
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.intent-group-container {
  padding: 0px 50px 30px 50px;

  .intentgroup-info-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: $hsag-lightgrey;
    padding: 15px 25px;
    margin-bottom: 30px;
  }

  .intent-search {
    width: 40%;
    margin-left: 20px;
    height: auto;
  }
}

#intent-hover {
  position: fixed;
  bottom: 20px;
  width: 50%;
  height: auto;
  left: calc(50% - $sideBarWidth);
  transform: translate(-15%, 0%);
  background-color: $hsag-blue-light;
  color: $hsag-white;
  border-radius: 5px;
  padding: 3px 20px;
  overflow-y: hidden;
  box-shadow: 0px 0px 12px 5px rgba(0, 0, 0, 0.14);
  z-index: 100;
  transition: bottom 0.3s ease-in-out;

  &.hidden {
    bottom: -200px;
  }
}

.el-table a {
  position: relative;
  z-index: 2000;
}

.svg-container {
  position: absolute;
  width: 20px;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  color: $hsag-white;
  cursor: pointer;
}
</style>
