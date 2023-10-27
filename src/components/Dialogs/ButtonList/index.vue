<template>
  <ul>
    <li v-for="button in sortedButtons" v-html="highlightSearchWord(button.title, searchValue)"></li>
  </ul>
</template>

<script>
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
    highlightSearchWord(text, searchWord) {
      const regex = new RegExp(`(${searchWord})`, 'gi');
      return text.replace(regex, '<span class="search-word">$1</span>');
    },
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
