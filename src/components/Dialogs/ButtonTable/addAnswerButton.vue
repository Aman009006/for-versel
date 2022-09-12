<template>
  <el-button
    id="addAnswerButton"
    icon="icon-Plus"
    class="add-btn"
    @click="currentAnswerButtons"
  />
</template>

<script>
export default {
  computed: {
    currentAnswerButtons() {
      return this.$store.getters;
    },
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
  border-radius: 10px !important;
  margin-left: 10px !important;
  margin-top: 25px !important;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  font-size: 15px;
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
