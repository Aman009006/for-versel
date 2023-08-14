<template>
  <div class="placeholder-element-container">
    <placeholderInfoBox />

    <placeholderTable />
  </div>
</template>

<script>
import placeholderInfoBox from "./placeholderInfoBox.vue";
import placeholderTable from "./placeholderTable.vue";

export default {
  name: "PlaceHolders",
  components: {
    placeholderInfoBox,
    placeholderTable,
  },
};
</script>

<style lang="scss" scoped>
.placeholder-element-container {
  padding: 0 50px 30px 50px;
}
</style>
