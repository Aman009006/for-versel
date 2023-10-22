<template>
  <div class="role-element-container">
    <roleInfoBox />
  </div>
</template>

<script>
import roleInfoBox from "./roleInfoBox.vue";

export default {
  components: {
    roleInfoBox
  },
};
</script>

<style lang="scss" scoped>
.role-element-container {
  padding: 0 50px 30px 50px;
}
</style>
