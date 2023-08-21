<template>
  <div>
    <intentsInfoBox></intentsInfoBox>
    <intentSearch :searchableArray="intentGroups" @filteredArray="updateIntentGroups">
    </intentSearch>
    <div class="intent-groups-container">
      <intentGroupContainer
        v-for="intentGroup in filteredArray"
        :intentGroup="intentGroup"></intentGroupContainer>
    </div>
  </div>
</template>

<script>
import intentsInfoBox from "./intentsInfoBox.vue";
import intentGroupContainer from "./intentGroupContainer.vue";
import intentSearch from "../../components/IntentSearch/index.vue"

export default {
  name: "Intents",
  components: {
    intentsInfoBox,
    intentSearch,
    intentGroupContainer,
  },
  props: {
    intentGroups: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filteredArray: this.intentGroups,
    };
  },
  methods: {
    updateIntentGroups(array) {
      this.filteredArray = array;
    }
  }
};
</script>

<style lang="scss" scoped></style>
