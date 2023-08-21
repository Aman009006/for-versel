<template>
  <a :href="getThisIntentsPath" class="intent-group">
    <h3>{{ intentGroup.SkillName }}</h3>
    <p>{{ getIntentAmount }} Anliegen</p>
  </a>
</template>

<script>
import { encodePathComponent } from '@/store/modules/permission'

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
      return `${basePath}${encodeURIComponent(encodePathComponent(thisIntentsPaths[0].meta.title))}`;
    },
  },
  methods: {
    getIntentPaths() {
      const paths = this.$store.getters.permission_routes;
      return paths.filter((path) => path.name === "IntentGroupOverview");
    },
  },
};
</script>

<style lang="scss" scoped></style>
