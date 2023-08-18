<template>
  <router-view>
    <intentsInfoBox></intentsInfoBox>
    <div class="intent-groups-container">
      <intentGroupContainer
        v-for="intentGroup in getIntentGroups"
        :intentGroup="intentGroup"
      ></intentGroupContainer>
    </div>
  </router-view>
</template>

<script>
import intentsInfoBox from "./intentsInfoBox.vue";
import intentGroupContainer from "./intentGroupContainer.vue";

export default {
  name: "Intents",
  components: {
    intentsInfoBox,
    intentGroupContainer,
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    getIntentGroups() {
      return this.$store.getters.skillsWithIntents;
    },
  },
};
</script>

<style lang="scss" scoped></style>
