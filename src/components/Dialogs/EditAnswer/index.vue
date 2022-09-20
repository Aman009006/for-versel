<template>
  <div @disableSaveButton="disableSaveButton">
    <h1 class="editHeadline">{{ humanReadableLabels.edit }}</h1>
    <p v-if="answer.description" class="description">
      {{ answer.description }}
    </p>

    <div>
      <h2>
        {{ humanReadableLabels.answerText }}
        <el-popover placement="top-start" :width="500" trigger="hover">
          <template #reference>
            <el-icon><icon-InfoFilled /></el-icon>
          </template>
          <template #default>
            <div>
              Wenn Sie Microsoft Windows verwenden, können Sie Emojis mit der
              Tastenkombination “⊞“ (Windowstaste) + “.” (Punkt) einfügen
            </div>
          </template>
        </el-popover>
      </h2>
      <MarkDownEditor ref="markDownEditor" :text="answer.text" />
    </div>

    <div v-if="showButtonTable()">
      <ButtonTable
        ref="buttonTable"
        :buttons="answer.buttons"
        :answerConfig="answerConfig"
      />
    </div>
  </div>
</template>

<script>
import { humanReadableLabels } from "@/constants";
import ButtonTable from "@/components/Dialogs/ButtonTable";
import MarkDownEditor from "@/components/MarkDownEditor";
import { setAnswerText } from "@/api/answers";
import { setButtonProperties } from "@/api/answers";
import { insertAnswerButton, deleteAnswerButton } from "@/api/answerButtons";

export default {
  components: {
    ButtonTable,
    MarkDownEditor,
  },
  inheritAttrs: true,
  props: ["answer", "answerConfig"],
  data() {
    return {
      humanReadableLabels,
    };
  },
  methods: {
    /**
     * This method must be used from the parent - element.
     * The parent - element must decide when the answer should be saved.
     * Like this we have the flexibility to reuse the EditAnswer - component.
     */
    async saveAnswerAndButtons() {
      const answersSaved = await this.saveAnswer();
      const buttonsSaved = await this.saveButtons();
      this.printSavedAnswerMessage(answersSaved, buttonsSaved);
    },
    async saveAnswer() {
      const currentAnswer = this.answer.text;
      const changedAnswer = this.$refs.markDownEditor.getData();
      if (currentAnswer != changedAnswer) {
        try {
          await setAnswerText(this.answer.id, changedAnswer);
        } catch {
          return false;
        }
      }
      return true;
    },
    async saveButtons() {
      const buttonsDeleted = await this.deleteButtons();
      const buttonsUpdated = await this.updateButtons();
      const buttonsInserted = await this.insertButtons();
      return buttonsUpdated || buttonsDeleted || buttonsInserted;
    },
    async updateButtons() {
      let res = true;
      if (this.$store.getters.currentEditedAnswerButtons.length != 0) {
        const oldButtons = this.answer.buttons;
        const updatedButtons = this.$store.getters.currentEditedAnswerButtons;
        for (let i = 0; i < oldButtons.length; i++) {
          const oldButton = oldButtons[i];
          const updatedButton = updatedButtons[i];
          if (this.buttonDiffers(oldButton, updatedButton)) {
            res = await this.isButtonPropertiesSet(oldButton, updatedButton);
          }
        }
      }
      return res;
    },
    async isButtonPropertiesSet(oldButton, updatedButton) {
      try {
        await setButtonProperties(
          this.answer.id,
          oldButton.title,
          updatedButton.title,
          updatedButton.type,
          updatedButton.value
        );
        return true;
      } catch {
        return false;
      }
    },
    async deleteButtons() {
      const buttonsIndexes = this.$store.getters.deletedAnswerButtonIndexes;
      const buttons = this.answer.buttons;
      let res = true;
      if (buttonsIndexes.length != 0) {
        for (let i = 0; i < buttonsIndexes.length; i++) {
          try {
            const button = buttons[buttonsIndexes[i]];
            button.answerId = this.answer.id;
            await deleteAnswerButton(button);
          } catch {
            res = false;
          }
        }
      }
      return res;
    },
    async insertButtons() {
      const buttons = this.$store.getters.newAnswerButtons;
      let res = true;
      if (buttons.length != 0) {
        for (let i = 0; i < buttons.length; i++) {
          try {
            const button = buttons[i];
            button.answerId = this.answer.id;
            await insertAnswerButton(button);
          } catch {
            res = false;
          }
        }
      }
      return res;
    },
    buttonDiffers(button1, button2) {
      const titleDiffers = button1.title != button2.title;
      const valueDiffers = button1.value != button2.value;
      const typeDiffers = button1.type != button2.type;
      return titleDiffers || valueDiffers || typeDiffers;
    },
    showButtonTable() {
      if (this.answer.buttons != null) {
        return true;
      } else if (this.answer.buttons == null && (this.answerConfig.type == "button" ||
          this.answerConfig.type == "multi")) {
          return true;
        } else {
          return false;
        }
    },
    printSavedAnswerMessage(answersSaved, buttonsSaved) {
      if (answersSaved && buttonsSaved) {
        this.printSuccess("Die Speicherung war erfolgreich");
      } else {
        this.printWarning("Es ist ein Fehler beim Speichern aufgetreten");
      }
    },
    printSuccess(text) {
      this.$message({
        message: text,
        type: "success",
      });
    },
    printWarning(text) {
      this.$message({
        message: text,
        type: "warning",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.editHeadline {
  color: $primary;
  font-size: 1.5em;
}

h2 {
  margin-top: 30px;
}
</style>
