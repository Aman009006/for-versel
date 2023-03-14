<template>
  <div :class="{ show: show }" class="header-search">
    <svg-icon :svg-icon-html="icons.search" class="search-icon" @click.stop="click" />

    <el-select v-model="filteredElements" collapse-tags multiple placeholder="Filter" class="header-search-select"
      @change="initFuse">
      <el-option v-for="item in filterElementOptions" :key="item" :label="item" :value="item" />
    </el-select>

    <el-select ref="headerSearchSelect" v-model="search" :remote-method="querySearch" filterable default-first-option
      remote placeholder="Suche" class="header-search-select" popper-class="header-search-popper" @change="change">
      <el-option v-for="element in options" :key="element.item.path" :value="element.item" class="header-search-option"
        v-html="getFoundElementHtml(element)" />
    </el-select>
  </div>
</template>

<script>
// Fuzzy searching finds strings that are approximately equal to a given pattern
import getFuseInstance from "@/utils/headerSearch/getFuseInstance"
import path from "path-browserify";
import HtmlEncode from "@/utils/HtmlEncode";
import { humanReadableLabels } from "@/constants";
import icons from "@/icons/index";
import SkillsWithIntentsDataGetterImpl from "@/utils/headerSearch/SkillsWithIntentsDataGetterImpl"

const filterElementObject = {
  intentName: {
    label: humanReadableLabels.intentName,
    searchKey: "intentName",
  },
  answerText: {
    label: humanReadableLabels.answerText,
    searchKey: "texts.text",
  },
  buttonTitle: {
    label: humanReadableLabels.buttonName,
    searchKey: "texts.buttons.title",
  },
  intent: {
    label: humanReadableLabels.technicalIntentName,
    searchKey: "intent"
  }
};

const filterElementValues = [
  filterElementObject.intentName,
  filterElementObject.answerText,
  filterElementObject.buttonTitle,
  filterElementObject.intent
];

const filterElementOptions = filterElementValues.map(
  (filterElement) => filterElement.label
);

export default {
  name: "HeaderSearch",
  data() {
    return {
      search: "",
      options: [],
      searchPool: [],
      show: false,
      fuse: undefined,
      filteredElements: filterElementOptions,
      /**
       * the text that the user searches for
       */
      userQuery: "",
    };
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routes;
    },
    skillsWithIntents() {
      return this.$store.getters.skillsWithIntents;
    },
    filterElementOptions() {
      return filterElementOptions;
    },
    intentArrayIndexInTitle() {
      return 2;
    },
    icons() {
      return icons;
    },
  },
  // watch is lazy by default, i.e. the callback is only called when the watched source has changed.
  watch: {
    routes() {
      this.searchPool = this.generateAndFilterRoutes(this.routes);
    },
    intentTexts() {
      // the intentTexts can change over time (when texts are changed for example)
      this.searchPool = this.generateAndFilterRoutes(this.routes);
    },
    searchPool() {
      this.initFuse();
    },
    show(value) {
      if (value) {
        document.body.addEventListener("click", this.close);
      } else {
        document.body.removeEventListener("click", this.close);
      }
    },
  },
  mounted() {
    this.searchPool = this.generateAndFilterRoutes(this.routes);
  },
  methods: {
    click() {
      this.show = !this.show;
      if (this.show) {
        this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus();
      }
    },
    close() {
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur();
      this.options = [];
      this.show = false;
    },
    change(val) {
      this.$router.push(val.path);
      this.search = "";
      this.options = [];
      // nextTick is a comfortable way to execute a function after the data has been set and the DOM has updated.
      this.$nextTick(() => {
        // Inside the callback, the DOM has been updated so we can interact with the “most updated” version of it.
        this.show = false;
      });
    },
    getSearchKeys() {
      /**
       * when no filter is selected, all filterElements should be treated
       * as selected.
       */
      let relevantFilterElements;
      if (this.filteredElements.length) {
        relevantFilterElements = this.filteredElements
      } else {
        relevantFilterElements = this.filterElementOptions;
      }
      const usedFilterElementValues = filterElementValues.filter(
        element => relevantFilterElements.includes(element.label)
      )
      const searchKeys = usedFilterElementValues.map(
        element => element.searchKey
      );
      return searchKeys;
    },
    initFuse() {
      this.fuse = getFuseInstance(this.searchPool, this.getSearchKeys());
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    generateRoutes(routes, basePath = "/", prefixTitle = []) {
      let res = [];
      for (const route of routes) {
        // skip hidden router
        if (route.hidden) {
          continue;
        }

        const dataGetter = new SkillsWithIntentsDataGetterImpl();;
        const data = {
          path: path.resolve(basePath, route.path),
          title: [...prefixTitle],
          texts: dataGetter.getTexts(route, this.skillsWithIntents),
          intent: dataGetter.getTechnicalIntentName(route, this.skillsWithIntents)
        };

        if (route.meta?.title) {
          data.title = [...data.title, route.meta.title];

          if (route.redirect !== "noRedirect") {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data);
          }
        }

        // recursive child routes
        if (route.children) {
          const tempRoutes = this.generateRoutes(
            route.children,
            data.path,
            data.title
          );
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes];
          }
        }
      }
      return res;
    },
    /**
     * filters out the non intent - routes. We only want to find intents
     */
    generateAndFilterRoutes(routes) {
      const generatedRoutes = this.generateRoutes(routes);
      const res = generatedRoutes
        // intent - routes don't have children
        .filter((route) => route.children == null)
        .map((route) => {
          route.intentName = route.title[this.intentArrayIndexInTitle];
          return route;
        });
      return res;
    },
    querySearch(query) {
      this.userQuery = query;
      if (query !== "") {
        // get the result of the search
        this.options = this.fuse.search(query);
      } else {
        this.options = [];
      }
    },
    markText(text, textIndex1, textIndex2) {
      let pathText = "";
      if (textIndex1 > textIndex2) {
        /**
         * dont understand why this happens, but sometimes
         * the first index is greater than the second.
         */
        [textIndex1, textIndex2] = [textIndex2, textIndex1];
      }
      // first part of the text
      pathText += HtmlEncode(text.substring(0, textIndex1));
      // text that was found
      pathText += `<span class="text-marker">${HtmlEncode(
        text.substring(textIndex1, textIndex2)
      )}</span>`;
      // last part of the text
      pathText += HtmlEncode(text.substring(textIndex2, text.length));
      return pathText;
    },
    getFoundElementHtml(element) {
      // search the matches to get the scores
      const fuseRes = getFuseInstance(element.matches, ["value"]).search(
        this.userQuery
      );
      // the items are sorted by scores. Get the element with the highest score
      const match = fuseRes[0].item;
      const { title } = element.item;
      // eslint-disable-next-line prefer-const
      // get the index with the longest distance from eachother
      const distances = match.indices.map((index) => index[1] - index[0]);
      const arrayIndexOfHighestDistanceIndex = distances.indexOf(
        Math.max(...distances)
      );
      // eslint-disable-next-line prefer-const
      let [textIndex1, textIndex2] =
        match.indices[arrayIndexOfHighestDistanceIndex];
      textIndex2++;
      /**
       * the index in the array of the element that was found.
       */
      const foundTextArrayIndex = title.findIndex(
        (_title, i) =>
          _title === match.value && i === this.intentArrayIndexInTitle
      );
      let pathText = "";
      title.forEach((_title, i) => {
        if (
          foundTextArrayIndex === i &&
          match.key === filterElementObject.intentName.searchKey
        ) {
          pathText += this.markText(_title, textIndex1, textIndex2);
        } else {
          pathText += HtmlEncode(_title);
        }
        if (i < title.length - 1) {
          pathText += HtmlEncode(" > ");
        }
      });
      if (
        match.key === filterElementObject.answerText.searchKey ||
        match.key === filterElementObject.buttonTitle.searchKey ||
        match.key === filterElementObject.intent.searchKey
      ) {
        let label = filterElementObject.answerText.label;
        if (match.key === filterElementObject.buttonTitle.searchKey) {
          label = filterElementObject.buttonTitle.label;
        } else if (match.key === filterElementObject.intent.searchKey) {
          label = filterElementObject.intent.label
        }
        // add the text to the result - text
        pathText += `
        <p class="answer-text">
          <strong>
            ${HtmlEncode(label)}
          </strong>: ${this.markText(match.value, textIndex1, textIndex2)}
        </p>`;
      }
      return pathText;
    },
  },
};
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
    width: 17px;
    display: inline-block;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}

.header-search-popper .el-select-dropdown__item {
  font-weight: normal;
  font-size: 16px;
  color: #606266;
}
</style>
