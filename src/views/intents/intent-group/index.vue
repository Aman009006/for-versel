<template>
  <div>
    <intentContainer v-for="child in children" :intent="child">{{
      child.name
    }}</intentContainer>
  </div>
</template>

<script>
import intentContainer from "./intentContainer.vue";
export default {
  name: "IntentGroup",
  components: {
    intentContainer,
  },
  props: {
    children: {
      type: Array,
      required: true,
    },
  },
  data() {
    console.log(this.$store.getters.permission_routes);
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
