<template>
  <ul>
    <li v-for="button in sortedButtons">{{ button.title }}</li>
  </ul>
</template>

<script>
export default {
  props: ["buttons"],

  computed: {
    sortedButtons(){
      return this.buttons.sort((a,b) => a.order - b.order);
    }
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
