<template>
  <intentsInfoBox></intentsInfoBox>
  <div class="intent-groups-container">
    <intentGroupContainer
      v-for="intentGroup in intentGroupCollection"
    ></intentGroupContainer>
  </div>
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
  props: {
    intentGroupCollection: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
