<template>
  <el-button id="addAnswerButton" class="add-btn" icon="icon-Plus">
    Neuen Antwort Button hinzufügen
  </el-button>
</template>

<script>
export default {
  computed: {
    // currentPlaceholders() {
    //   return this.$store.getters.placeholders;
    // },
  },
  methods: {
    // async addPlaceholder() {
    //   if (!this.currentPlaceholders[this.currentPlaceholders.length - 1].edit) {
    //     this.currentPlaceholders.push({ key: "", value: "", edit: true });
    //   }
    // },
  },
};
</script>

<style lang="scss">
#addAnswerButton,
#addAnswerButton:hover {
  color: white !important;
  border-radius: 9px !important;
  margin-left: 10px !important;
  margin-top: 25px !important;
}

#addAnswerButton {
  background-color: #63c731 !important;
  border-color: #63c731 !important;
}

 #addAnswerButton:hover {
  background-color: #85ce61 !important;
  border-color: #85ce61 !important;
}
</style>
