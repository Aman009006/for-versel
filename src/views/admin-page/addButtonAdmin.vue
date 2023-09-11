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
