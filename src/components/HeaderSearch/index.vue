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
      placeholder="Suche"
      class="header-search-select"
      popper-class="header-search-popper"
      @change="change"
    >
      <el-option
        v-for="element in options"
        :key="element.item.path"
        :value="element.item"
        class="header-search-option"
        v-html="getFoundElementHtml(element)"
      />
    </el-select>
  </div>
</template>

<script>
// Fuzzy searching finds strings that are approximately equal to a given pattern
import Fuse from 'fuse.js'
import { encodePathComponent } from '@/store/modules/permission'
import path from 'path'
import HtmlEncode from '@/utils/HtmlEncode'
import { humanReadableLabels } from '@/constants'

const filterElementObject = {
  intent: {
    label: 'Intent',
    searchKey: 'intent',
  },
  answerText: {
    label: humanReadableLabels.answerText,
    searchKey: 'texts.text',
  },
  buttonTitle: {
    label: 'Button Name',
    searchKey: 'texts.buttons.title',
  },
}

const filterElementValues = [
  filterElementObject.intent,
  filterElementObject.answerText,
  filterElementObject.buttonTitle,
]

const filterElementOptions = filterElementValues.map(
  (filterElement) => filterElement.label
)

export default {
  name: 'HeaderSearch',
  data() {
    return {
      search: '',
      options: [],
      searchPool: [],
      show: false,
      fuse: undefined,
      filteredElements: filterElementOptions,
      /**
       * the text that the user searches for
       */
      userQuery: '',
    }
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routes
    },
    intentTexts() {
      return this.$store.getters.skillsWithIntents
    },
    filterElementOptions() {
      return filterElementOptions
    },
    intentArrayIndexInTitle() {
      return 2
    },
  },
  // watch is lazy by default, i.e. the callback is only called when the watched source has changed.
  watch: {
    routes() {
      this.searchPool = this.generateAndFilterRoutes(this.routes)
    },
    intentTexts() {
      // the intentTexts can change over time (when texts are changed for example)
      this.searchPool = this.generateAndFilterRoutes(this.routes)
    },
    searchPool() {
      this.initFuse()
    },
    show(value) {
      if (value) {
        document.body.addEventListener('click', this.close)
      } else {
        document.body.removeEventListener('click', this.close)
      }
    },
  },
  mounted() {
    this.searchPool = this.generateAndFilterRoutes(this.routes)
  },
  methods: {
    click() {
      this.show = !this.show
      if (this.show) {
        this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
      }
    },
    close() {
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
      this.options = []
      this.show = false
    },
    change(val) {
      this.$router.push(val.path)
      this.search = ''
      this.options = []
      // nextTick is a comfortable way to execute a function after the data has been set and the DOM has updated.
      this.$nextTick(() => {
        // Inside the callback, the DOM has been updated so we can interact with the “most updated” version of it.
        this.show = false
      })
    },
    getSearchKeys() {
      /**
       * when no filter is selected, all filterElements should be treated
       * as selected. Sometimes I don't understand user experience o.0
       */
      const relevantFilterElements = this.filteredElements.length
        ? this.filteredElements
        : this.filterElementOptions
      return filterElementValues
        .filter((el) => relevantFilterElements.includes(el.label))
        .map((el) => el.searchKey)
    },
    initFuse() {
      this.fuse = this.getFuseInstance(this.searchPool, this.getSearchKeys())
    },
    getFuseInstance(searchPool, searchKeys) {
      /**
       * Fuse gets two arguments: list (collection where the search happens)
       * and options
       */
      return new Fuse(searchPool, {
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
        distance: 5000, // default 100
        maxPatternLength: 32,
        /**
         * Only the matches whose length exceeds this value will be returned.
         * If you want to ignore single character matches in the result, set it to 2.
         */
        minMatchCharLength: 1,
        // List of keys that will be searched.
        keys: searchKeys,
        includeMatches: true,
      })
    },
    checkIfRouteIsIntent(route) {
      // intent - routes doesn't have children (right now)
      return route.children == null
    },
    findTextForRoute(router) {
      // add the texts for the intent
      const intentText = this.intentTexts
        .map((intentText) => intentText.Intents)
        .flat()
        .find(
          (intentElement) =>
            encodePathComponent(intentElement.name) === router.path &&
            this.checkIfRouteIsIntent(router)
        )
      return intentText?.texts
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = []

      for (const router of routes) {
        // skip hidden router
        if (router.hidden) {
          continue
        }

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle],
          texts: this.findTextForRoute(router),
        }

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title]

          if (router.redirect !== 'noRedirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data)
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = this.generateRoutes(
            router.children,
            data.path,
            data.title
          )
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    },
    /**
     * filters out the non intent - routes. We only want to find intents
     */
    generateAndFilterRoutes(routes) {
      const generatedRoutes = this.generateRoutes(routes)
      const res = generatedRoutes
        .filter((route) => this.checkIfRouteIsIntent(route))
        .map((route) => {
          route.intent = route.title[this.intentArrayIndexInTitle]
          return route
        })
      return res
    },
    querySearch(query) {
      this.userQuery = query
      if (query !== '') {
        // get the result of the search
        this.options = this.fuse.search(query)
      } else {
        this.options = []
      }
    },
    markText(text, textIndex1, textIndex2) {
      let pathText = ''
      if (textIndex1 > textIndex2) {
        /**
         * dont understand why this happens, but sometimes
         * the first index is greater than the second.
         */
        ;[textIndex1, textIndex2] = [textIndex2, textIndex1]
      }
      // first part of the text
      pathText += HtmlEncode(text.substring(0, textIndex1))
      // text that was found
      pathText += `<span class="text-marker">${HtmlEncode(
        text.substring(textIndex1, textIndex2)
      )}</span>`
      // last part of the text
      pathText += HtmlEncode(text.substring(textIndex2, text.length))
      return pathText
    },
    getFoundElementHtml(element) {
      // search the matches to get the scores
      const fuseRes = this.getFuseInstance(element.matches, ['value']).search(
        this.userQuery
      )
      // the items are sorted by scores. Get the element with the highest score
      const match = fuseRes[0].item
      const { title } = element.item
      // eslint-disable-next-line prefer-const
      // get the index with the longest distance from eachother
      const distances = match.indices.map((index) => index[1] - index[0])
      const arrayIndexOfHighestDistanceIndex = distances.indexOf(
        Math.max(...distances)
      )
      // eslint-disable-next-line prefer-const
      let [textIndex1, textIndex2] =
        match.indices[arrayIndexOfHighestDistanceIndex]
      textIndex2++
      /**
       * the index in the array of the element that was found.
       */
      const foundTextArrayIndex = title.findIndex(
        (_title, i) =>
          _title === match.value && i === this.intentArrayIndexInTitle
      )
      let pathText = ''
      title.forEach((_title, i) => {
        if (
          foundTextArrayIndex === i &&
          match.key === filterElementObject.intent.searchKey
        ) {
          pathText += this.markText(_title, textIndex1, textIndex2)
        } else {
          pathText += HtmlEncode(_title)
        }
        if (i < title.length - 1) {
          pathText += HtmlEncode(' > ')
        }
      })
      if (
        match.key === filterElementObject.answerText.searchKey ||
        match.key === filterElementObject.buttonTitle.searchKey
      ) {
        let label = filterElementObject.answerText.label
        if (match.key === filterElementObject.buttonTitle.searchKey) {
          label = filterElementObject.buttonTitle.label
        }
        // add the text to the result - text
        pathText += `
        <p class="answer-text">
          <strong>
            ${HtmlEncode(label)}
          </strong>: ${this.markText(match.value, textIndex1, textIndex2)}
        </p>`
      }
      return pathText
    },
  },
}
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
    font-size:16px;
    color: #606266;
  }

</style>
