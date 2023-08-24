<template>
  <div class="editAnswerModal">
    <el-button class="edit-btn" icon="icon-Edit" @click="openEditModal()">
      Bearbeiten
    </el-button>
    <Teleport to="body">
      <div v-if="editModalOpened" class="modalBox">
        <div class="modalContent">
          <span class="svg-container" @click="closeEditModal()">
            <svg-icon :svg-icon-html="icons.close" />
          </span>
          <EditAnswer
            ref="editAnswerRef"
            :answer="answer"
            :answerConfig="answerConfig"
          />
          <div class="buttonsContainer">
            <el-button
            class="cancel-btn"
            :disabled="savingCurrently"
            @click="closeEditModal()"
            >
            Abbrechen
          </el-button>
          <el-button
            id="saveAnswerButton"
            class="confirm-btn"
            :disabled="confirmButtonDisabled"
            :loading="saveAnswerClicked"
            @click="saveAnswer()"
          >
            Speichern
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
import ButtonUtilities from "@/store/utilities/ButtonUtilities";
import icons from "@/icons/index";

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
      return !ButtonUtilities.areButtonsValid(this.$store);
    },
    confirmButtonDisabled() {
      return this.savingCurrently || this.buttonsInValid;
    },
    icons() {
      return icons;
    },
  },
  methods: {
    openEditModal() {
      this.$store.dispatch(
        dispatchNames.resetStateAndSaveCopyOfButtons,
        this.answer.buttons
      );
      this.$store.dispatch(dispatchNames.getVirtualIntents);
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
  display: flex;
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
    position: relative;
    width: 95%;
    margin: auto;
    max-width: 850px;
    padding: 25px;
    background-color: white;
    text-align: left;
    
    .svg-container {
      position: absolute;
      width: 20px;
      top: 10px;
      right: 10px;
      display: flex;
      align-items: center;
      color: $hsag-black;
      cursor: pointer;
    }

    .buttonsContainer {
      float: right;
      margin-top: 15px;
      .cancel-btn:disabled {
        background-color: #f78989 !important;
        border: 0 !important;
      }
    }
    #saveAnswerButton {
      background-color: $hsag-blue-light;
      cursor: pointer;

      &:hover {
        background-color: $hsag-blue-light-shade;
      }
    }
    #saveAnswerButton:disabled {
      background-color: lightgray !important;
      border: 0 !important;
      cursor: default;
    }
  }
}
</style>
