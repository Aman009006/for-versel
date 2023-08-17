<template>
  <a :href="getThisIntentsPath" class="intent-group">
    <h3>{{ intentGroup.SkillName }}</h3>
    <p>{{ getIntentAmount }} Anliegen</p>
  </a>
</template>

<script>
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
      const currentPath = this.$router.currentRoute.value.path;
      const intentPaths = this.getIntentPaths();
      const thisIntentsPaths = intentPaths[0].children.filter(
        (child) => child.meta && child.meta.title === this.intentGroup.SkillName
      );
      return `${currentPath}/${thisIntentsPaths[0].path}`;
    },
  },
  methods: {
    getIntentPaths() {
      const paths = this.$store.getters.permission_routes;
      return paths.filter((path) => path.name === "Dialoge");
    },
  },
};
</script>

<style lang="scss" scoped></style>
