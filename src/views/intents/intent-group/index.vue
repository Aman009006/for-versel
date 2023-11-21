<template>
  <div class="intent-group-container">
    <div class="intentgroup-info-container">
      <intentGroupInfoBox :headline="intentGroup"></intentGroupInfobox>
      <searchInput
        class="intent-search"
        :searchableArray="intents"
        @filteredArray="updateIntents">
      </searchInput>
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
      :row-class-name="addClassToTableRowMatchingStorage"
      :header-cell-style="{ padding: '0 0 0 20px', height: '50px' }"
      :cell-style="{ padding: '0 0 0 20px', height: '80px' }">
      <el-table-column
        prop="name"
        label="Name"
        width="500">
        <template #default="{ row }">
          <p v-html="addHighlightSearchWord(row.name, searchValue)"></p>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="Beispiele / Beschreibung">
        <template #default="{ row }">
          <p>{{row.description}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="answers"
        label="Status">
        <template v-slot="{ row }">
          <template v-if="fillRedirectAndAnswerInfo(row) === 'Weiterleitung'">
            <a :href="getRedirectPath(row)">
              <div class="intent-status-pill is-redirect">
                <p>{{ fillRedirectAndAnswerInfo(row) }}</p>
              </div>
            </a>
          </template>
          <template v-else-if="fillRedirectAndAnswerInfo(row) === 'Keine Antwort'">
            <div class="intent-status-pill is-no-answer">
              <p>{{ fillRedirectAndAnswerInfo(row) }}</p>
            </div>
          </template>
          <template v-else>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        label="Aktion"
        width="180">
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
import searchInput from "@/components/SearchInput/index.vue"
import { encodePathComponent } from '@/utils/encodePath'
import { addActiveToSidebar, removeActiveFromSidebar } from "@/utils/sidebar/sidebarUtils";
import LastClickedIntent from "@/utils/LastClickedIntent"
import IntentNameGenerator from "@/utils/intents/IntentNameGenerator";
import icons from "@/icons/index";
import MarkdownIt from "markdown-it";
import addHighlightSearchWord from "@/utils/addHighlightSearchWordUtils";
const md = MarkdownIt({ html: true });

export default {
  name: "IntentGroup",
  components: {
    intentGroupInfoBox,
    searchInput,
  },
  props: {
    intentGroup: {
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
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.meta.intent) {
        vm.startScrollToProcess();
      }
    });
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
    searchValue() {
      return this.$store.getters.search
    }
  },
  methods: {
    addHighlightSearchWord,
    updateIntents(array) {
      this.filteredArray = array;
    },
    handleHover(row) {
      if (event.target.tagName === "BUTTON" || event.target.tagName === "SPAN") {
        return;
      }
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
          intentContainer.setAttribute('data-intent', row.intent);
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
    fillRedirectAndAnswerInfo(row) {
      let result = '';
      const redirect = row.answers.isRedirected;
      const hasAnswers = row.answers.answers
      if (redirect === true) {
        result += 'Weiterleitung';
      } else if (hasAnswers === false && redirect === false) {
        result += 'Keine Antwort';
      }
      return result;
    },
    getRedirectPath(row) {
      const routes = this.$router.getRoutes();
      const redirectRoute = row.answers.redirectsTo;
      const findRoute = routes.find(route => route.meta.title === redirectRoute);
      if (findRoute !== undefined) {
        const resolvedRoute = this.$router.resolve(findRoute.path);
        return resolvedRoute.href;
      }
    },
    getIntentSessionStorage() {
      const intent = sessionStorage.getItem('lastClickedIntent');
      const intentGroup = sessionStorage.getItem('lastClickedIntentGroup');
      return { intent, intentGroup };
    },
    startScrollToProcess() {
      const { intent } = this.getIntentSessionStorage();
      const handleScrollProcess = new LastClickedIntent(intent, this.intentGroup).handleScrollProcess();
      return handleScrollProcess;
    },
    addClassToTableRowMatchingStorage({ row }) {
      const storageIntent = sessionStorage.getItem('lastClickedVirtualIntent');
      const rowIntent = this.technicalIntentName(row);
      if (rowIntent === storageIntent) {
        return 'is-storage-intent';
      }
    },
    technicalIntentName(row) {
      const intentNameGenerator = new IntentNameGenerator(row.intent, row.entity);
      return intentNameGenerator.getTechnicalIntentName();
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
    bottom: -300px;
  }
}

.intent-status-pill {
  display: flex;
  width: 150px;
  justify-content: center;
  padding: 5px 20px;
  border-radius: 5px;
  font-size: 12px;
  color: $hsag-white;

  @media screen and (max-width: 1430px){
    width: 100px;
    padding: 5px;
  }

  p {
    margin: 0;
  }

  &.is-redirect {
    background-color: $hsag-warning;
  }

  &.is-no-answer {
    background-color: $hsag-error;
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
