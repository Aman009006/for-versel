<template>
  <div>
    <intentGroupInfobox></intentGroupInfobox>
    <intentSearch :searchableArray="children" @filteredArray="updateIntents"></intentSearch>
    <intentContainer v-for="child in filteredArray" :intent="child">{{
      child.name
    }}</intentContainer>
  </div>
</template>

<script>
import intentGroupInfobox from "./intentGroupInfobox.vue";
import intentSearch from "../../../components/IntentSearch/index.vue"
import intentContainer from "./intentContainer.vue";

export default {
  name: "IntentGroup",
  components: {
    intentGroupInfobox,
    intentSearch,
    intentContainer,
  },
  props: {
    children: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filteredArray: this.children,
    };
  },
  methods: {
    updateIntents(array) {
      this.filteredArray = array;
    }
  }
};
</script>

<style lang="scss" scoped></style>
