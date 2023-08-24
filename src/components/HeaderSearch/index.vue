<template>
  <div :class="{ show: show }" class="header-search">
    <svg-icon :svg-icon-html="icons.search" class="search-icon" @click.stop="click" />

    <el-select v-model="filteredElements" collapse-tags multiple placeholder="Filter" class="header-search-select"
      @change="initFuse">
      <el-option v-for="item in activeFilterElements" :key="item" :label="item" :value="item" />
    </el-select>

    <el-select ref="headerSearchSelect" v-model="search" :remote-method="querySearch" filterable default-first-option
      remote placeholder="Suche" class="header-search-select" popper-class="header-search-popper" @change="change">
      <el-option v-for="element in options" :key="element.item.path" :value="element.item" class="header-search-option"
        v-html="getHtmlFormattedElement(element)" />
    </el-select>
  </div>
</template>

<script>
import getFuseInstance from "@/utils/headerSearch/getFuseInstance"
import { humanReadableLabels, headerSearch } from "@/constants";
import icons from "@/icons/index";
import SearchElementFormatter from "@/utils/headerSearch/SearchElementFormatter"
import RouteHandler from "@/utils/headerSearch/RouteHandler"

const filterElementsObject = {
  intentName: {
    label: humanReadableLabels.intentName,
    searchKey: "intentName",
  },
  intent: {
    label: humanReadableLabels.technicalIntentName,
    searchKey: "intent"
  },
  answerText: {
    label: humanReadableLabels.answerText,
    searchKey: "texts.text",
  },
  buttonTitle: {
    label: humanReadableLabels.buttonName,
    searchKey: "texts.buttons.title",
  }
};

const filterElementsArray = [
  filterElementsObject.intentName,
  filterElementsObject.intent,
  filterElementsObject.answerText,
  filterElementsObject.buttonTitle
];

const activeFilterElements = filterElementsArray.map(
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
      filteredElements: activeFilterElements,
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
    activeFilterElements() {
      return activeFilterElements;
    },
    intentArrayIndexInTitle() {
      return headerSearch.intentArrayIndexInTitle;
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
      // the intentTexts can change over time
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
    initFuse() {
      this.fuse = getFuseInstance(this.searchPool, this.getSearchKeys());
    },
    getSearchKeys() {
      /**
       * when no filter is selected, all filterElements should be treated
       * as selected.
       */
      let activeFilterElements;
      if (this.filteredElements.length) {
        activeFilterElements = this.filteredElements
      } else {
        activeFilterElements = this.activeFilterElements;
      }
      const usedFilterElementValues = filterElementsArray.filter(
        element => activeFilterElements.includes(element.label)
      )
      const searchKeys = usedFilterElementValues.map(
        element => element.searchKey
      );
      return searchKeys;
    },
    generateAndFilterRoutes(routes) {
      const routeHandler = new RouteHandler(this.skillsWithIntents);
      const generatedRoutes = routeHandler.generateRoutes(routes);
      const filteredRoutes = routeHandler.filterRoutes(generatedRoutes);
      return filteredRoutes;
    },
    querySearch(query) {
      this.userQuery = query;
      if (query !== "") {
        this.options = this.fuse.search(query);
      } else {
        this.options = [];
      }
    },
    getHtmlFormattedElement(element) {
      const formatter = new SearchElementFormatter(element, filterElementsObject, this.userQuery);
      return formatter.getElementWithHtmlFormatting();
    },
  },
};
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 22px;
    vertical-align: middle;
    width: 22px;
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
