<template>
  <el-tooltip v-if="isSidebarClosed()" :content="this.title" placement="right">
    <span>
      <i v-if="isElementIcon()" :class="['sub-el-icon', icon]" />
      <svg-icon v-if="isSvgIcon()" :svg-icon-html="svgIconHtml" />
      <span v-if="hasTitle()">{{ title }}</span>
    </span>
  </el-tooltip>
  <span v-else popper-class="hidden-popper">
    <i v-if="isElementIcon()" :class="['sub-el-icon', icon]" />
    <svg-icon v-if="isSvgIcon()" :svg-icon-html="svgIconHtml" />
    <span v-if="hasTitle()">{{ title }}</span>
  </span>
</template>

<script>
import { getIconByName } from "@/icons";

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
  computed: {
    svgIconHtml() {
      return getIconByName(this.icon);
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
    isSidebarClosed() {
      const isSidebarClosed = window.localStorage.getItem("sidebarClosed");
      return isSidebarClosed;
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
