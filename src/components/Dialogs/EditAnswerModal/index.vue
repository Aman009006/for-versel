<template>
  <div class="editAnswerModal">
    <el-button
      class="edit-btn"
      size="small"
      icon="el-icon-edit"
      @click="openEditModal()"
    >
      Bearbeiten
    </el-button>
    <div v-if="editModalOpened" class="modalBox">
      <div class="modalContent">
        <EditAnswer :answer="answer" />
      </div>
    </div>
  </div>
</template>

<script>
import EditAnswer from "@/components/Dialogs/EditAnswer";

export default {
  components: {
    EditAnswer,
  },
  props: ["answer"],
  data() {
    return {
      editModalOpened: false,
    };
  },
  methods: {
    openEditModal() {
      this.editModalOpened = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.modalBox {
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background-color: rgb(0 0 0 / 38%);
  overflow-y: scroll;
  .modalContent {
    width: 95%;
    margin: auto;
    max-width: 850px;
    padding: 25px;
    background-color: white;
    text-align: left;
  }
}
</style>