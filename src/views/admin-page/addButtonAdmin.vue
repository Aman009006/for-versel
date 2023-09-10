<template>
  <el-button
    class="add-btn"
    icon="icon-Plus"
    @click="startCreatingNewUser()"
  >
    Nutzer Hinzufügen
  </el-button>
</template>

<script>
import UsersUtilities from "@/store/utilities/UsersUtilities";

export default {
  methods: {
    async startCreatingNewUser() {
      UsersUtilities.startCreatingNewUser(this.$store);
    },
  },
};
</script>

<style lang="scss">
.add-btn,
.add-btn:hover {
  color: white !important;
  border-radius: 9px !important;
  margin-left: 0px !important;
  margin-top: 10px !important;
}
</style>
