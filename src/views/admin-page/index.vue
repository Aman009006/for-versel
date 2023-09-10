<template>
  <div class="user-element-container">
    <userInfoBox />

    <userTable />
  </div>
</template>

<script>
import userInfoBox from "./userBox.vue";
import userTable from "./userTable.vue";

export default {
  name: "Benutzer",
  components: {
    userInfoBox,
    userTable,
  },
};
</script>

<style lang="scss" scoped>
.user-element-container {
  padding: 0 50px 30px 50px;
}
</style>
