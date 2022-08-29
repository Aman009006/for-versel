<template>
  <el-button
    class="add-btn"
    size="small"
    icon="el-icon-plus"
    @click="addPlaceholder()"
  >
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
    async addPlaceholder() {
      if (!this.currentPlaceholders[this.currentPlaceholders.length - 1].edit) {
        this.currentPlaceholders.push({ key: "", value: "", edit: true });
      }
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
