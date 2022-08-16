<template>
  <small :title="title">ℹ</small>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";
small {
  color: $red;
  cursor: default;
  background-color: #80808059;
  padding: 3px 10px;
  border-radius: 20px;
}
</style>