<template>
  <div>
    <h1 class="editHeadline">{{ humanReadableLabels.edit }}</h1>
    <p v-if="answer.description" class="description">
      {{ answer.description }}
    </p>

    <div>
      <h2>{{ humanReadableLabels.answerText }}</h2>
      <MarkDownEditor :text="answer.text" />
    </div>

    <div v-if="answer.buttons">
      <h2>Buttons</h2>
      <ButtonTable :buttons="answer.buttons" />
    </div>

    <div class="buttonsContainer">
      <el-button class="confirm-btn" size="small" @click="confirmEdit(row)">
        Speichern
      </el-button>
      <el-button class="cancel-btn" size="small" @click="cancelEdit(row)">
        Abbrechen
      </el-button>
    </div>
  </div>
</template>

<script>
import { humanReadableLabels } from "@/constants";
import ButtonTable from "@/components/Dialogs/ButtonTable";
import MarkDownEditor from "@/components/MarkDownEditor";

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
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.buttonsContainer {
  margin-top: 15px;
}

.editHeadline {
  color: $primary;
}

h2 {
  margin-top: 30px;
}
</style>
