<template>
  <div class="placeholder-element-container">
    <placeholderInfoBox />
  </div>
</template>

<script>
import placeholderInfoBox from "./placeholderInfoBox.vue";

export default {
  name: "PlaceHolders",
  components: {
    placeholderInfoBox,
  },
};
</script>

<style lang="scss" scoped>
.placeholder-element-container {
  padding: 0 50px 30px 50px;
}
</style>
