<template>
  <a :href="getThisIntentsPath">
    <div class="intent-group">
      <h3>{{ intentGroup.SkillName }}</h3>
      <p>{{ getIntentAmount }} Anliegen</p>
    </div>
  </a>
</template>

<script>
import { encodePathComponent } from '@/utils/encodePath'
import { intentConstants } from '@/constants'

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
      const thisIntentsPaths = intentPaths.children.filter(
        (intentPath) => intentPath.meta && intentPath.meta.title === this.intentGroup.SkillName
      );
      return `${basePath}/${encodeURIComponent(encodePathComponent(thisIntentsPaths[0].meta.title))}`;
    },
  },
  methods: {
    getIntentPaths() {
      const paths = this.$store.getters.permission_routes;
      const intentPaths = paths.filter((path) => path.name === intentConstants.intentGroups);
      return intentPaths[0];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.intent-group {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 130px;
  background-color: $hsag-lightgrey;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: $hsag-bluegrey;
    color: $hsag-white;
  }

  h3 {
    margin: 0;
  }

  p {
    margin: 5px 0 0 0;
  }
}
</style>
