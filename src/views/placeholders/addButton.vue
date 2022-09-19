<template>
  <el-button
    class="add-btn"
    icon="icon-Plus"
    @click="startCreatingNewPlaceholder()"
  >
    Neuen Platzhalter hinzufügen
  </el-button>
</template>

<script>
import PlaceholderUtilities from "@/store/utilities/PlaceholderUtilities";

export default {
  methods: {
    async startCreatingNewPlaceholder() {
      PlaceholderUtilities.startCreatingNewPlaceholder(this.$store);
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

.add-btn {
  background-color: #63c731 !important;
  border-color: #63c731 !important;
}

.add-btn:hover {
  background-color: #85ce61 !important;
  border-color: #85ce61 !important;
}
</style>
