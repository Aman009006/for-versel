<template>
  <a :href="getThisIntentsPath" class="intent-group">
    <h3>{{ intentGroup.SkillName }}</h3>
    <p>{{ getIntentAmount }} Anliegen</p>
  </a>
</template>

<script>
import path from "path-browserify";
import { isExternal } from '@/utils/validate';

export default {
  name: "IntentGroupContainer",
  components: {},
  props: {
    intentGroup: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    getIntentAmount() {
      return this.intentGroup.Intents.length;
    },
    getThisIntentsPath() {
      const basePath = this.$router.currentRoute.value.href;
      const intentPaths = this.getIntentPaths();
      const thisIntentsPaths = intentPaths[0].children.filter(
        (child) => child.meta && child.meta.title === this.intentGroup.SkillName
      );
      return `${basePath}/${thisIntentsPaths[0].path}`;
    },
  },
  methods: {
    getIntentPaths() {
      const paths = this.$store.getters.permission_routes;
      return paths.filter((path) => path.name === "IntentGroup");
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      return path.resolve(routePath);
    },
  },
};
</script>

<style lang="scss" scoped></style>
