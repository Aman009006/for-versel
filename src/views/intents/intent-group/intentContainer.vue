<template>
    <a :href="getThisIntentsPath" class="intent-group">
      <h3>{{ intent.name }}</h3>
    </a>
  </template>
  
  <script>
  import { encodePathComponent } from '@/store/modules/permission'

  export default {
    name: "IntentContainer",
    components: {},
    props: {
      intent: {
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
        return `${basePath}/${encodeURIComponent(encodePathComponent(this.intent.name))}`;
      },
    },
    methods: {
      getIntentPaths() {
        const paths = this.$store.getters.permission_routes;
        return paths.filter((path) => path.name === "IntentGroupOverview");
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
  