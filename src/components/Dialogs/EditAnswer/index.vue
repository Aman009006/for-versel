<template>
  <div>
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

    <div v-if="answer.buttons">
      <h2>Buttons</h2>
      <ButtonTable ref="buttonTable" :buttons="answer.buttons" />
    </div>
  </div>
</template>

<script>
import { humanReadableLabels } from "@/constants";
import ButtonTable from "@/components/Dialogs/ButtonTable";
import MarkDownEditor from "@/components/MarkDownEditor";
import { setAnswerText } from "@/api/answers";
import { setButtonProperties } from "@/api/answers";

export default {
  components: {
    ButtonTable,
    MarkDownEditor,
  },
  inheritAttrs: true,
  props: ["answer"],
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
      let res = true;
      const currentButtons = this.answer.buttons;
      if (currentButtons != null) {
        const newButtons = this.$refs.buttonTable.copiedButtons;
        for (let i = 0; i < currentButtons.length; i++) {
          const currentButton = currentButtons[i];
          const newButton = newButtons[i];
          if (this.buttonDiffers(currentButton, newButton)) {
            try {
              await setButtonProperties(
                this.answer.id,
                currentButton.title,
                newButton.title,
                newButton.type,
                newButton.value
              );
            } catch {
              res = false;
            }
          }
        }
      }
      return res;
    },
    buttonDiffers(button1, button2) {
      const titleDiffers = button1.title != button2.title;
      const valueDiffers = button1.value != button2.value;
      return titleDiffers || valueDiffers;
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
