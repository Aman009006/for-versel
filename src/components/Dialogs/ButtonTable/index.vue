<template>
  <div id="tableButtonContainer" style>
    <div id="tableTitleContainer">
      <h2>Buttons</h2>
      <el-button
        v-if="answerConfig.type == 'button' || answerConfig.type == 'multi'"
        id="addAnswerButton"
        icon="icon-Plus"
        class="add-btn"
        @click="addAnswerButton"
      />
    </div>
    <el-table id="answerButtonsTable" :data="copiedButtons" border>
      <el-table-column label="Name" align="center" :min-width="columnMinWidth">
        <template #default="scope">
          <el-input
            ref="titleColumn"
            v-model="scope.row.title"
            type="textarea"
            autosize
            @input="saveButtonsIntoStore();"
          />
          <!-- <div
            v-if="checkDuplicateTitles(scope.$index, scope.row)"
            class="warning"
          >
            TitelDuplikat: Buttons dürfen nicht den gleichen Titel haben
          </div>
          <div v-if="checkEmptyInputs(scope.row.title)" class="warning">
            Leeres Feld: Es darf kein Eingabefeld leer gelassen werden
          </div> -->
        </template>
      </el-table-column>

      <el-table-column align="center" :min-width="columnMinWidth">
        <template #header>
          Wert
          <el-popover
            ref="PopOverValue"
            placement="top-start"
            :width="400"
            trigger="hover"
          >
            <template #reference>
              <el-icon><icon-InfoFilled /></el-icon>
            </template>
            <template #default>
              <div class="popOverContent">
                Werte können nur bei Buttons mit dem Typ
                <strong>openUrl</strong>
                bearbeitet werden.
              </div>
            </template>
          </el-popover>
        </template>
        <template #default="scope">
          <el-input
            v-model="scope.row.value"
            type="textarea"
            autosize
            @input="
              saveButtonsIntoStore();
            "
          />
        </template>
      </el-table-column>

      <el-table-column align="center" :min-width="columnMinWidth">
        <template #header>
          Typ
          <el-popover
            ref="PopOverType"
            placement="top-start"
            :width="400"
            trigger="hover"
          >
            <template #reference>
              <el-icon><icon-InfoFilled /></el-icon>
            </template>
            <template #default>
              <div class="popOverContent">
                Der Typ eines Buttons kann
                <strong>nicht</strong>
                geändert werden.
              </div>
            </template>
          </el-popover>
        </template>
        <template #default="scope">
          <el-select v-model="scope.row.type" @change="saveButtonsIntoStore">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="scope">
          <el-button
            id="deleteAnswerButton"
            size="small"
            type="danger"
            icon="icon-Delete"
            @click="handleDelete(scope.$index, scope.row)"
            >Löschen
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div id="warnings">
      <span id="warningText" ref="warningText" />
      <span id="warningTextEmpty" ref="warningTextEmpty" />
    </div>
  </div>
</template>

<script>
import { dispatchNames } from "@/constants";

export default {
  name: "ButtonTable",
  inheritAttrs: true,
  props: ["buttons", "answerConfig"],
  data() {
    return {
      columnMinWidth: 200,
      tableButtons: [],
      options: [
        {
          value: "imBack",
          label: "imBack",
        },
        {
          value: "openUrl",
          label: "openUrl ",
        },
      ],
    };
  },
  computed: {
    copiedButtons() {
      if (this.buttons != null) {
        const copiedButtons = JSON.parse(JSON.stringify(this.buttons));
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.tableButtons = copiedButtons;
        this.resetStoreProperties;
        return copiedButtons;
      }
      return null;
    },
    resetStoreProperties() {
      this.$store.dispatch(
        dispatchNames.resetStateProperties,
        JSON.parse(JSON.stringify(this.buttons))
      );
      return null;
    },
  },
  methods: {
    handleDelete(tableIndex, row) {
      this.tableButtons.splice(tableIndex, 1);
      if (row?.new != true) {
        this.$store.dispatch(dispatchNames.markDeleted, tableIndex);
      }
      this.saveButtonsIntoStore();
    },
    saveButtonsIntoStore() {
      this.$store.dispatch(
        dispatchNames.updateStateProperties,
        JSON.parse(JSON.stringify(this.tableButtons))
      );
    },
    checkDuplicateTitles(rowIndex, rowButton) {
      let noDublicate = true;
      this.tableButtons.forEach((button, index) => {
        if (button.title == rowButton.title && index != rowIndex) {
          noDublicate = false;
          this.$emit("disableSaveButtonDuplicate", !noDublicate);
        }
      });
      if (noDublicate) {
        this.$emit("disableSaveButtonDuplicate", !noDublicate);
      }
      return !noDublicate;
    },
    checkEmptyInputs(value) {
      let noEmpty = true;
        if (value === "") {
          noEmpty = false;
          this.$emit("disableSaveButtonEmpty", !noEmpty);
        }
      if (noEmpty) {
        this.$emit("disableSaveButtonEmpty", !noEmpty);
      }
      return !noEmpty;
    },
    addAnswerButton() {
      this.tableButtons.push({
        title: "",
        value: "",
        type: "imBack",
        identificator: null,
        new: true,
      });
      this.saveButtonsIntoStore();
    },
  },
};
</script>

<style lang="scss" scoped>
.popOverContent {
  text-align: center;
}

#tableTitleContainer {
  display: flex;
}
#deleteAnswerButton {
  max-width: 90px;
}

#addAnswerButton,
#addAnswerButton:hover {
  color: white !important;
  border-radius: 10px !important;
  margin-left: 10px !important;
  margin-top: 15px !important;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  font-size: 15px;
}

#addAnswerButton {
  background-color: #63c731 !important;
  border-color: #63c731 !important;
}

#addAnswerButton:hover {
  background-color: #85ce61 !important;
  border-color: #85ce61 !important;
}

.warning {
  color: red;
  font-size: 10px;
}
</style>
