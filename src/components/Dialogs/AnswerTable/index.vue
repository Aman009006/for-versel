<template>
  <div class="table-container">
    <div v-if="disabled" class="disabled-layer" />
    <el-table :data="answers" border>
      <el-table-column
        align="center"
        label="Beschreibung"
        prop="description"
        width="150"
      />

      <el-table-column
        align="center"
        :label="answerText"
        prop="text"
        min-width="500"
      />

      <el-table-column align="center" label="Buttons" width="200">
        <template slot-scope="{ row: answer }">
          <template v-if="answer.buttons">
            <ButtonList :buttons="answer.buttons" />
          </template>
          <template v-else>
            <el-alert
              title="Diese Antwort hat keine Buttons"
              type="info"
              :closable="false"
              center
            />
          </template>
        </template>
      </el-table-column>

      <el-table-column align="center" width="130">
        <template slot-scope="{ row: answer }">
          <EditAnswerModal :answer="answer" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ButtonList from "@/components/Dialogs/ButtonList";
import EditAnswerModal from "@/components/Dialogs/EditAnswerModal";
import { humanReadableLabels } from "@/constants";

export default {
  components: {
    ButtonList,
    EditAnswerModal,
  },
  props: ["disabled", "answers"],
  data() {
    return {
      answerText: humanReadableLabels.answerText,
    };
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  position: relative;
  // The chatbot, which has a fixed position, should not cover the table
  margin-bottom: 120px;
  .disabled-layer {
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    background-color: rgb(239 239 239 / 77%);
  }
}
</style>