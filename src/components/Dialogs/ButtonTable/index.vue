<template>
  <div id="tableButtonContainer" style>
    <div id="tableTitleContainer">
      <h2>Buttons</h2>
      <el-button
        v-if="isButtonOrMulti(answerConfig)"
        id="addAnswerButton"
        icon="icon-Plus"
        class="add-btn"
        @click="addAnswerButton"
      />
    </div>
    <el-table :data="copiedButtons" border fixed="true">
      <el-table-column label="Name" align="center" :min-width="columnMinWidth">
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
            v-if="isButtonOrMulti(answerConfig)"
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
          <div v-else style="border: 1px solid lightgrey; border-radius: 5px">
            {{ scope.row.type }}
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="isButtonOrMulti(answerConfig)" align="center">
        <template #default="scope">
          <el-button
            id="deleteAnswerButton"
            size="default"
            type="danger"
            icon="icon-Delete"
            @click="deleteAnswerButton(scope.row, scope.$index)"
          />
        </template>
      </el-table-column>
    </el-table>
    <div id="warnings">
      <el-alert
        v-if="titleDuplicate"
        id="warningText"
        ref="warningText"
        type="warning"
        title="Keine Titelduplikate!"
        :closable="false"
      />
      <el-alert
        v-if="inputEmpty"
        id="warningTextEmpty"
        ref="warningTextEmpty"
        type="warning"
        title="Keine leeren Felder erlaubt!"
        :closable="false"
      />
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
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.tableButtons = JSON.parse(JSON.stringify(this.buttons));
        this.resetStoreProperties;
        return this.tableButtons;
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
    deleteAnswerButton(answerButton, index) {
      this.$store.dispatch(dispatchNames.deleteAnswerButton, {
        button: answerButton,
        rowIndex: index,
      });
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
      const titles = this.tableButtons.map((button) => button.title);
      titles.sort();
      var last = titles[0];
      for (var i = 1; i < titles.length; i++) {
        if (titles[i] == last) this.titleDuplicate = true;
        last = titles[i];
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
      this.$store.dispatch(dispatchNames.addNewAnswerButton)
      this.checkEmptyInputs();
    },
    isButtonOrMulti(answerConfig) {
      return answerConfig.type == "button" || answerConfig.type == "multi";
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
  border: 0px !important;
}

.addAnswerButton,
.addAnswerButton:hover {
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

.addAnswerButton {
  background-color: #63c731 !important;
  border-color: #63c731 !important;
}

.addAnswerButton:hover {
  background-color: #85ce61 !important;
  border-color: #85ce61 !important;
}

#warnings {
  color: red;
  font-size: 15px;
  span {
    float: left;
    clear: left;
  }
}
</style>
