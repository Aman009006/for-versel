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
    <el-table
      id="answerButtonsTable"
      :data="copiedButtons"
      border
    >
      <el-table-column label="Name" align="center" :min-width="columnMinWidth" fixed="true">
        <template #default="scope">
          <el-input
            ref="titleColumn"
            v-model="scope.row.title"
            type="textarea"
            autosize
            @input="
              saveButtonsIntoStore();
              checkDuplicateTitles();
              checkEmptyInputs();
            "
          />
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
              checkEmptyInputs();
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
          <el-select
            v-if="answerConfig.type == 'button' || answerConfig.type == 'multi'"
            v-model="scope.row.type"
            @change="saveButtonsIntoStore"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div v-else style="border: 2px solid black">{{ scope.row.type }}</div>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="scope">
          <el-button
            v-if="answerConfig.type == 'button' || answerConfig.type == 'multi'"
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
      <span v-if="titleDuplicate" id="warningText" ref="warningText">
        Keine Titelduplikate!
      </span>
      <span v-if="inputEmpty" id="warningTextEmpty" ref="warningTextEmpty">
        Keine leeren Felder!
      </span>
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
      inputEmpty: false,
      titleDuplicate: false,
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
      this.checkDuplicateTitles();
    },
    saveButtonsIntoStore() {
      this.$store.dispatch(
        dispatchNames.updateStateProperties,
        JSON.parse(JSON.stringify(this.tableButtons))
      );
    },
    checkDuplicateTitles() {
      this.titleDuplicate = false;
      for (let i = 0; i < this.tableButtons.length; i++) {
        this.tableButtons.forEach((button, index) => {
          if (i !== index && this.tableButtons[i].title == button.title) {
            this.titleDuplicate = true;
            return;
          }
        });
      }
      this.$emit("disableSaveButtonDuplicate", this.titleDuplicate);
    },
    checkEmptyInputs() {
      this.inputEmpty = false;
      this.tableButtons.forEach((button) => {
        if (button.title === "" || button.value === "") {
          this.inputEmpty = true;
          return;
        }
      });
      this.$emit("disableSaveButtonEmpty", this.inputEmpty);
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
      this.checkEmptyInputs();
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

#warnings {
  color: red;
  font-size: 15px;
  margin-bottom: 40px;
  span {
    float: left;
    clear: left
  }

}
</style>
