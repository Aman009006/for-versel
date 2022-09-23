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
            <el-button
              class="cancel-btn"
              :disabled="savingCurrently"
              @click="closeEditModal()"
            >
              Abbrechen
            </el-button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
import EditAnswer from "@/components/Dialogs/EditAnswer/index.vue";
import { dispatchNames } from "@/constants";

export default {
  components: {
    EditAnswer,
  },
  props: ["answer", "answerConfig"],
  data() {
    return {
      editModalOpened: false,
      savingCurrently: false,
      saveAnswerClicked: false,
    };
  },
  computed: {
    readableIntentName() {
      return this.$route.meta.title;
    },
    buttonsInValid() {
      return (
        this.$store.getters.titleDuplicate || this.$store.getters.inputEmpty
      );
    },
    confirmButtonDisabled() {
      return this.savingCurrently || this.buttonsInValid;
    },
  },
  methods: {
    openEditModal() {
      this.$store.dispatch(
        dispatchNames.resetStateAndSaveCopyOfButtons,
        this.answer.buttons
      );
      this.savingCurrently = false;
      this.saveAnswerClicked = false;
      this.editModalOpened = true;
    },
    closeEditModal() {
      this.editModalOpened = false;
    },
    async saveAnswer() {
      this.savingCurrently = true;
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
      .cancel-btn:disabled {
        background-color: #f78989 !important;
        border: 0 !important;
      }
    }
    #saveAnswerButton:disabled {
      background-color: lightgray !important;
      border: 0 !important;
    }
  }
}
</style>
