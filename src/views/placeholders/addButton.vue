<template>
  <el-button class="add-btn" icon="icon-Plus" @click="createAddNewPlaceholderForm()">
    Neuen Platzhalter hinzufügen
  </el-button>
</template>

<script>
import PlaceholderUtilities from "@/store/utilities/PlaceholderUtilities";

export default {
  computed: {
    currentPlaceholders() {
      return this.$store.getters.placeholders;
    },
  },
  methods: {
    async createAddNewPlaceholderForm() {
      if (!this.isInsertingPlaceholderCurrently()) {
        const newPlaceholderKey = "";
        this.currentPlaceholders.push({ key: newPlaceholderKey, value: "", insertPlaceholder: true });
        PlaceholderUtilities.startEditingPlaceholder(this.$store, newPlaceholderKey);
      }
    },
    isInsertingPlaceholderCurrently() {
      return this.currentPlaceholders[this.currentPlaceholders.length - 1].insertPlaceholder;
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
