<template>
  <div :class="{ show: show }" class="header-search">
    <svg-icon
      class-name="search-icon"
      icon-class="search"
      @click.stop="click"
    />

    <el-select
      v-model="filteredElements"
      collapse-tags
      multiple
      placeholder="Filter"
      class="header-search-select"
      @change="initFuse"
    >
      <el-option
        v-for="item in filterElementOptions"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>

    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option
        v-for="item in options"
        :key="item.path"
        :value="item"
        :label="item.title.join(' > ')"
      />
    </el-select>
  </div>
</template>

<script>
// Fuzzy searching finds strings that are approximately equal to a given pattern
import Fuse from "fuse.js";
import { encodePathComponent } from "@/store/modules/permission";
import path from "path";

const filterElementValues = [
  {
    label: "Intent",
    searchKey: "title",
  },
  {
    label: "Antworttext",
    searchKey: "texts.text",
  },
  {
    label: "Buttons",
    searchKey: "texts.buttons.title",
  },
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
      filterElementOptions,
      filteredElements: filterElementOptions,
    };
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routes;
    },
    intentTexts() {
      return this.$store.getters.skillsWithIntents;
    },
  },
  // watch is lazy by default, i.e. the callback is only called when the watched source has changed.
  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes);
    },
    intentTexts() {
      // the intentTexts can change over time (when texts are changed for example)
      this.searchPool = this.generateRoutes(this.routes);
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
    this.searchPool = this.generateRoutes(this.routes);
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
      return filterElementValues
        .filter((el) => this.filteredElements.includes(el.label))
        .map((el) => el.searchKey);
    },
    initFuse() {
      /**
       * Fuse gets two arguments: list (collection where the search happens)
       * and options
       */
      this.fuse = new Fuse(this.searchPool, {
        shouldSort: true,
        /**
         * Defines when the match algorithm gives up:
         * 0.0 requires a perfect match of both letters and location
         * 1.0 would match anything
         */
        threshold: 0.4,
        // Determines approximately where the pattern is expected to be found in the text.
        location: 0, // default 0
        /**
         * Determines how close the match must be to the fuzzy location specified by location:
         * A distance of 1000 would require a perfect match to be within 800 characters
         * of the location to be found using a threshold of 0.8.
         */
        distance: 100, // default 100
        maxPatternLength: 32,
        /**
         * Only the matches whose length exceeds this value will be returned.
         * If you want to ignore single character matches in the result, set it to 2.
         */
        minMatchCharLength: 1,
        // List of keys that will be searched.
        keys: this.getSearchKeys(),
      });
    },
    findTextForRoute(router) {
      // add the texts for the intent
      const intentText = this.intentTexts
        .map((intentText) => intentText.Intents)
        .flat()
        // intent - routes doesn't have children (right now)
        .find(
          (intentElement) =>
            encodePathComponent(intentElement.name) === router.path &&
            router.children == null
        );
      return intentText?.texts;
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    generateRoutes(routes, basePath = "/", prefixTitle = []) {
      let res = [];

      for (const router of routes) {
        // skip hidden router
        if (router.hidden) {
          continue;
        }

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle],
          texts: this.findTextForRoute(router),
        };

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title];

          if (router.redirect !== "noRedirect") {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data);
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = this.generateRoutes(
            router.children,
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
    querySearch(query) {
      if (query !== "") {
        // get the result of the search
        this.options = this.fuse.search(query);
      } else {
        this.options = [];
      }
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

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
