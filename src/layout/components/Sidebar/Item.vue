<template>
  <span>
    <i v-if="isElementIcon()" :class="['sub-el-icon', icon]" />
    <svg-icon v-if="isSvgIcon()" :icon-class="icon" />
    <span v-if="hasTitle()" v-bind="title" />
  </span>
</template>

<script>
export default {
  name: "MenuItem",
  functional: true,
  inheritAttrs: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  methods: {
    hasIcon() {
      return this.icon != null;
    },
    isElementIcon() {
      return this.hasIcon() && this.icon.includes("el-icon");
    },
    isSvgIcon() {
      return this.hasIcon() && !this.isElementIcon();
    },
    hasTitle() {
      return this.title != null;
    },
  },
};
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
