<template>
  <section class="app-main">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <router-view :key="key" v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb/index.vue";

export default {
  name: "AppMain",
  inheritAttrs: true,
  components: {
    Breadcrumb,
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.app-main {
  position: absolute;
  min-height: calc(100vh - $navBarHeight);
  width: calc(100% - $sideBarWidth);
  margin-top: $navBarHeight;
  margin-left: $sideBarWidth;
  overflow: hidden;
  transition: margin-left 0.28s;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - $navBarHeight);
  }
}
.hideSidebar {
  .app-main {
    width: calc(100% - $sideBarWidthCollapsed);
    margin-left: $sideBarWidthCollapsed;
  }
}
</style>

<style lang="scss">
.el-popover {
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.2;
}
.el-popper[x-placement^="top"] .popper__arrow::after {
  border-top-color: rgb(0, 0, 0) !important;
}
</style>
