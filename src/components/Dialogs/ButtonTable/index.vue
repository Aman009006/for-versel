<template>
  <div id="tableButtonContainer" style>
    <div id="tableTitleContainer">
      <h2>Buttons</h2>
      <el-button
        v-if="isButtonOrMulti(answerConfig)"
        icon="icon-Plus"
        class="add-btn addAnswerButton"
        @click="addAnswerButton"
      />
    </div>
    <el-table :data="currentEditedButtons" border fixed="true">
      <el-table-column label="Name" align="center" :min-width="columnMinWidth">
        <template #default="scope">
          <el-input
            ref="titleColumn"
            v-model="scope.row.title"
            type="textarea"
            autosize
            @input="buttonValidation"
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
            @input="checkEmptyInputs()"
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
            v-model="scope.row.type"
            :disabled="!isButtonOrMulti(answerConfig)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column v-if="isButtonOrMulti(answerConfig)" align="center">
        <template #default="scope">
          <el-button
            id="deleteAnswerButton"
            size="default"
            type="danger"
            icon="icon-Delete"
            @click="deleteAnswerButton(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <div id="warnings">
      <el-alert
        v-if="getTitleDuplicate"
        id="warningText"
        ref="warningText"
        type="warning"
        title="Keine Namenduplikate erlaubt!"
        :closable="false"
      />
      <el-alert
        v-if="getInputEmpty"
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
    currentEditedButtons() {
      const {
        currentEditedAnswerButtons,
        newAnswerButtons,
        deletedAnswerButtonIndexes,
      } = this.$store.getters;
      const currentAnswerButtons = [
        ...currentEditedAnswerButtons,
        ...newAnswerButtons,
      ];
      return currentAnswerButtons.filter((button, index) => {
        return !deletedAnswerButtonIndexes.includes(index);
      });
    },
    getInputEmpty() {
      return this.$store.getters.inputEmpty;
    },
    getTitleDuplicate() {
      return this.$store.getters.titleDuplicate;
    },
  },
  methods: {
    deleteAnswerButton(answerButton) {
      this.$store.dispatch(dispatchNames.deleteAnswerButton, answerButton);
      this.buttonValidation();
    },
    addAnswerButton() {
      this.$store.dispatch(dispatchNames.addNewAnswerButton);
      this.buttonValidation();
    },
    checkDuplicateTitles() {
      this.$store.dispatch(dispatchNames.setTitleDuplicate, false);
      const titles = this.currentEditedButtons.map((button) => button.title);
      titles.sort();
      var last = titles[0];
      for (var i = 1; i < titles.length; i++) {
        if (titles[i] == last) {
          this.$store.dispatch(dispatchNames.setTitleDuplicate, true);
        }
        last = titles[i];
      }
    },
    checkEmptyInputs() {
      const isEmpty = this.currentEditedButtons.some((button) => {
        return button.title === "" || button.value === "";
      });
      this.$store.dispatch(dispatchNames.setInputEmpty, isEmpty);
    },
    buttonValidation() {
      this.checkDuplicateTitles();
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
