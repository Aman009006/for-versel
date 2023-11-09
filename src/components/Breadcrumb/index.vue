<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="!hideOnHome" class="no-redirect">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    },
  },
  computed: {
    hideOnHome() {
      return this.$route.fullPath === '/home';
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // combine intent info into breadcrumb
      if (this.$route.fullPath.includes('/intent')) {
        const intentBreadcrumbElements = this.defineIntentBreadcrumb();
        this.levelList = intentBreadcrumbElements;
      } else {
        // only show routes with meta.title
        let matched = this.$route.matched.filter(
          (item) => item.meta && item.meta.title
        );

        this.levelList = matched.filter(
          (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
        );
      }
    },
    isHome(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === "Home".toLocaleLowerCase();
    },
    defineIntentBreadcrumb() {
      const route = this.$route;
      const routes = this.$store.getters.permission_routes;
      const intentBreadcrumbElements = {};

      const intentDefault = routes.find(item => item.path === '/intents').children[0];
      const intentGroup = this.findIntentGroup(routes, route);
      const intent = this.findTechnicalIntent(routes, route);

      const intentData = [intentDefault, intentGroup, intent];
      console.log(intentData)
      for (let i = 0; i < intentData.length; i++) {
        if (intentData[i]) {
          intentBreadcrumbElements[i] = intentData[i];
        }
      }
      return intentBreadcrumbElements;
    },
    findIntentGroup(routes, route) {
      const intentGroups = routes.find(item => item.name === 'intentGroups');
      return intentGroups.children.find(item => item.meta.title === route.meta.title || item.meta.title === route.meta.intentGroup);
    },
    findTechnicalIntent(routes, route) {
      return routes.find(item => item.name === 'TechnicalIntents').children.find(item => item.meta.title === route.meta.title);
    }
  },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 50px;
  min-height: 50px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}

.breadcrumb-placeholder {
  margin-bottom: 52px
}
</style>
