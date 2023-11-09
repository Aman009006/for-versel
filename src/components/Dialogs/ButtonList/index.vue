<template>
  <ul>
    <li v-for="button in sortedButtons" v-html="addHighlightSearchWord(button.title, searchValue)"></li>
  </ul>
</template>

<script>
import addHighlightSearchWord from "@/utils/AddHihlightSearchWordUtils";

export default {
  props: ["buttons"],

  computed: {
    sortedButtons(){
      return this.buttons.sort((a,b) => a.order - b.order);
    },
    searchValue() {
      return this.$store.getters.search
    }
  },
  methods: {
    addHighlightSearchWord,
  }
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding-left: 0;
  li {
    margin-bottom: 3px;
  }
}
</style>
