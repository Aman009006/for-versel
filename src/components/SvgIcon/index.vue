<template>
  <div
    v-if="svgIconHtml != null"
    class="svg-icon"
    aria-hidden="true"
    v-html="svgIconHtml"
  />
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    svgIconHtml: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 100%;
  height: 100%;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
