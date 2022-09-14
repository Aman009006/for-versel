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
      const oldButtons = this.$store.getters.unchangedAnswerButtons;
      const updatedButtons = this.$store.getters.currentAnswerButtons.filter(
        (button) => button?.new != true
      );
      if (oldButtons.length != 0 && updatedButtons.length != 0) {
        let index = -1;
        for (let i = 0; i < oldButtons.length; i++) {
          index++;
          if (oldButtons[i]?.deleted == true) {
            index--;
          } else {
            const currentButton = oldButtons[i];
            const newButton = updatedButtons[index];
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
      }
      return res;
    },
    async deleteButtons() {
      const buttons = this.$store.getters.deletedAnswerButtons;
      let res = true;
      if (buttons.length != 0) {
        for (let i = 0; i < buttons.length; i++) {
          try {
            buttons[i].answerId = this.answer.id
            await deleteAnswerButton(buttons[i]);
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
            buttons[i].answerId = this.answer.id
            await insertAnswerButton(buttons[i]);
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
