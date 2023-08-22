<template>
  <div>
    <intentsInfoBox></intentsInfoBox>
    <intentSearch searchScope="intentGroup" :searchableArray="intentGroups" @filteredArray="updateIntentGroups">
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
  mounted() {
    this.addActiveToSidebar();
  },
  unmounted() {
    this.removeActiveFromSidebar();
  },
  methods: {
    updateIntentGroups(array) {
      this.filteredArray = array;
    }, 
    addActiveToSidebar() {
      const intentContainer = document.getElementsByClassName('is-intent')[0];
      intentContainer.classList.add('is-active');
    },
    removeActiveFromSidebar() {
      const intentContainer = document.getElementsByClassName('is-intent')[0];
      intentContainer.classList.remove('is-active');
    }
  }
};
</script>

<style lang="scss" scoped></style>
