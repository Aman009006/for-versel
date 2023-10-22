<template>
  <div class="role-element-container">
    <roleInfoBox />
    <roleTable />
  </div>
</template>

<script>
import roleInfoBox from "./roleInfoBox.vue";
import roleTable from "./roleTable.vue";

export default {
  components: {
    roleInfoBox,
    roleTable,
  },
};
</script>

<style lang="scss" scoped>
.role-element-container {
  padding: 0 50px 30px 50px;
}
</style>
