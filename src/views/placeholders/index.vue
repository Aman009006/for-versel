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
  components: {
    placeholderInfoBox,
    placeholderTable,
  },
};
</script>

<style scoped lang="scss">
.placeholder-element-container {
  padding: 30px 50px;
}
</style>