<template>
  <div>
    <h1 class="editHeadline">{{ humanReadableLabels.edit }}</h1>
    <p v-if="answer.description" class="description">
      {{ answer.description }}
    </p>

    <div>
      <h2>{{ humanReadableLabels.answerText }}</h2>
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
  props: ["answer"],
  data() {
    return {
      humanReadableLabels,
    };
  },
  methods: {
    printWarning(warningText) {
      this.$message({
        message: warningText,
        type: "warning",
      });
    },
    /**
     * This method must be used from the parent - element.
     * The parent - element must decide when the answer should be saved.
     * Like this we have the flexibility to reuse the EditAnswer - component.
     */
    async saveAnswerAndButtons() {
      await this.saveAnswer();
      await this.saveButtons();
    },
    async saveAnswer() {
      const currentAnswer = this.answer.text;
      const changedAnswer = this.$refs.markDownEditor.copiedText;
      if (currentAnswer != changedAnswer) {
        try {
          await setAnswerText(this.answer.id, changedAnswer);
        } catch {
          this.printWarning("Der Antworttext konnte nicht geändert werden.");
        }
      }
    },
    async saveButtons() {
      const currentButtons = this.answer.buttons;
      const newButtons = this.$refs.buttonTable.copiedButtons;
      if (currentButtons != null) {
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
              this.printWarning("Ein Button konnte nicht gespeichert werden");
            }
          }
        }
      }
    },
    buttonDiffers(button1, button2) {
      const titleDiffers = button1.title != button2.title;
      const valueDiffers = button1.value != button2.value;
      return titleDiffers || valueDiffers;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.editHeadline {
  color: $primary;
}

h2 {
  margin-top: 30px;
}
</style>
