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
      return `${basePath}/${encodeURIComponent(encodePathComponent(thisIntentsPaths[0].meta.title))}`;
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

  &:hover{
    background-color: $hsag-bluegrey;
    color: $hsag-white;
  }
  h3{
    margin: 0;
  }
  p{
    margin: 5px 0 0 0;
  }
}
</style>
