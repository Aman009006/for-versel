<template>
  <div class="intent-container">
    <div class="intents-info-container">
      <intentsInfoBox></intentsInfoBox>
      <intentSearch class="intent-search" searchScope="intentGroup" :searchableArray="intentGroups"
        @filteredArray="updateIntentGroups">
      </intentSearch>
    </div>
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
import { addActiveToSidebar, removeActiveFromSidebar } from "@/utils/sidebar/sidebarUtils";

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
  mounted() {
    addActiveToSidebar('is-intent');
  },
  unmounted() {
    removeActiveFromSidebar('is-intent');
  },
  methods: {
    updateIntentGroups(array) {
      this.filteredArray = array;
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.intent-container {
  padding: 0px 50px 30px 50px;

  .intents-info-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: $hsag-lightgrey;
    padding: 15px 25px;
    margin-bottom: 30px;
  }

  .intent-search {
    width: 40%;
    margin-left: 20px;
    height: auto;
  }
}

.intent-groups-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row: auto;
  gap: 30px;
}
</style>
