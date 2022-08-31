<template>
  <ul>
    <li v-for="button in buttons">{{ button.title }}</li>
  </ul>
</template>

<script>
export default {
  props: ['buttons'],
}
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
