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
