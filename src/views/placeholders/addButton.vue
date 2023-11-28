<template>
  <el-button
    :class="canCreate ? 'add-btn' : 'cancel-btn'"
    icon="icon-Plus"
    @click="startCreatingNewPlaceholder()"
    :style="!canCreate && 'margin-top: 10px'"
  >
    Neuen Platzhalter hinzufügen
  </el-button>
</template>

<script>
import PlaceholderUtilities from "@/store/utilities/PlaceholderUtilities";

export default {
  props: {
    canCreate: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    async startCreatingNewPlaceholder() {
      if (this.canCreate) {
        PlaceholderUtilities.startCreatingNewPlaceholder(this.$store);
      } else {
        this.$message({
          message: "Sie haben keine Berechtigung, neue Platzhalter hinzuzufügen.",
          type: "error",
        });
      }
    },
  },
};
</script>
