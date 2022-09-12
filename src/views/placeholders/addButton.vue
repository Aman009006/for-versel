<template>
  <el-button class="add-btn" icon="icon-Plus" @click="createAddNewPlaceholderForm()">
    Neuen Platzhalter hinzufügen
  </el-button>
</template>

<script>
export default {
  computed: {
    currentPlaceholders() {
      return this.$store.getters.placeholders;
    },
  },
  methods: {
    async createAddNewPlaceholderForm() {
      if (!this.isInsertingPlaceholderCurrently()) {
        this.currentPlaceholders.push({ key: "", value: "", edit: true, insertPlaceholder: true });
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
