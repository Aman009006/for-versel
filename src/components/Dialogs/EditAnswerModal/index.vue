<template>
  <div class="editAnswerModal">
    <el-button class="edit-btn" icon="icon-Edit" @click="openEditModal()">
      Bearbeiten
    </el-button>
    <Teleport to="body">
      <div v-if="editModalOpened" class="modalBox">
        <div class="modalContent">
          <EditAnswer
            ref="editAnswerRef"
            :answer="answer"
            :answerConfig="answerConfig"
            @disableSaveButtonEmpty="toggleSaveButtonEmpty"
            @disableSaveButtonDuplicate="toggleSaveButtonDuplicate"
          />
          <div class="buttonsContainer">
            <el-button
              id="saveAnswerButton"
              class="confirm-btn"
              :disabled="confirmButtonDisabled"
              :loading="saveAnswerClicked"
              @click="saveAnswer()"
            >
              Speichern
            </el-button>
            <el-button class="cancel-btn" @click="closeEditModal()">
              Abbrechen
            </el-button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import EditAnswer from "@/components/Dialogs/EditAnswer";
import { dispatchNames } from "@/constants";

export default {
  components: {
    EditAnswer,
  },
  props: ["answer", "answerConfig"],
  data() {
    return {
      editModalOpened: false,
      confirmButtonDisabled: false,
      saveAnswerClicked: false,
      empty: false,
      duplicate: false,
    };
  },
  computed: {
    readableIntentName() {
      return this.$route.meta.title;
    },
  },
  methods: {
    openEditModal() {
      this.confirmButtonDisabled = false;
      this.saveAnswerClicked = false;
      this.editModalOpened = true;
    },
    closeEditModal() {
      this.editModalOpened = false;
    },
    async saveAnswer() {
      this.confirmButtonDisabled = true;
      this.saveAnswerClicked = true;
      await this.$refs.editAnswerRef.saveAnswerAndButtons();
      this.refreshAnswers();
      this.closeEditModal();
    },
    async refreshAnswers() {
      this.$store.dispatch(
        dispatchNames.getAndSetIntentAnswers,
        this.readableIntentName
      );
      this.setSkillsAndIntents();
    },
    setSkillsAndIntents() {
      this.$store.dispatch(dispatchNames.setSkillsAndIntentsFullQualified);
    },
    toggleSaveButtonDuplicate(flag) {
      this.duplicate = flag;
      this.confirmButtonDisabled = this.duplicate || this.empty;
    },
    toggleSaveButtonEmpty(flag) {
      this.empty = flag;
      this.confirmButtonDisabled = this.duplicate || this.empty;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

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
  color: $darkGrey;

  .modalContent {
    width: 95%;
    margin: auto;
    max-width: 850px;
    padding: 25px;
    background-color: white;
    text-align: left;

    .buttonsContainer {
      margin-top: 15px;
    }
    #saveAnswerButton:disabled {
      background-color: #85ce61 !important;
    }
  }
}
</style>
