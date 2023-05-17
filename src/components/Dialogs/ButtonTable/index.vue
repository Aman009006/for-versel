<template>
  <div id="tableButtonContainer" style>
    <div id="tableTitleContainer">
      <h2>Buttons</h2>
      <el-button icon="icon-Plus" class="add-btn addAnswerButton" @click="addAnswerButton" />
    </div>
    <el-table :data="currentEditedButtons" border fixed="true" row-class-name="buttonRow" :default-sort="{prop: 'order', order: 'ascending'}">
      <el-table-column label="Pos." align="center" prop="order" :min-width="columnPosMinWidth">
        <template #default="scope">
          <el-select v-model="scope.row.order" @change="validateButtonsAndSaveStateInStore()">
            <el-option v-for="item in getOrderNumbers" :key="item" :label="item" :value="item" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="Name" align="center" :min-width="columnMinWidth">
        <template #default="scope">
          <el-input ref="titleColumn" v-model="scope.row.title" type="textarea" autosize
            @input="validateButtonsAndSaveStateInStore" />
        </template>
      </el-table-column>

      <el-table-column align="center" :min-width="columnMinWidth">
        <template #header>
          Wert
          <el-popover ref="PopOverValue" placement="top-start" :width="400" trigger="hover">
            <template #reference>
              <el-icon>
                <icon-InfoFilled />
              </el-icon>
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
          <el-input v-if="!isMessageBackButton(scope.row)" v-model="scope.row.value" type="textarea" autosize
            @input="validateButtonsAndSaveStateInStore()" />
          <el-select v-else v-model="scope.row.virtualIntent" filterable @change="validateButtonsAndSaveStateInStore()">
            <el-option v-for="item in getVirtualIntents" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-alert v-if="isInvalidUrlButton(scope.row)" type="error" :closable="false">
            Der Wert muss mit <b>http://</b> oder <b>https://</b> beginnen, oder einen <b>Platzhalter</b> enthalten.
          </el-alert>
          <el-alert v-if="isSelectedOption(scope.row)" type="error" :closable="false">
            Im Dropdown sollte ein Intent ausgwählt sein.
          </el-alert>
        </template>
      </el-table-column>

      <el-table-column align="center" :min-width="columnMinWidth">
        <template #header>
          Typ
          <el-popover ref="PopOverType" placement="top-start" :width="400" trigger="hover">
            <template #reference>
              <el-icon>
                <icon-InfoFilled />
              </el-icon>
            </template>
            <template #default>
              <div class="popOverContent">
                <strong>openURL:</strong> Verlinkung auf Webseite per Button <br>
                <strong>messageBack: </strong> Verlinkung auf anderen Intent per Button
              </div>
            </template>
          </el-popover>
        </template>
        <template #default="scope">
          <el-select v-model="scope.row.type" @change="validateButtonsAndSaveStateInStore()">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template #default="scope">
          <el-button id="deleteAnswerButton" size="default" type="danger" icon="icon-Delete"
            @click="deleteAnswerButton(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-alert v-if="getTitleDuplicate" type="error" title="Keine Namenduplikate erlaubt!" :closable="false" />
      <el-alert v-if="getInputEmpty" type="error" title="Keine leeren Felder erlaubt!" :closable="false" />
    </div>
  </div>
</template>

<script>
import { dispatchNames, buttonTypes } from "@/constants";
import ButtonUtilities from "@/store/utilities/ButtonUtilities";
import ButtonValidatorImpl from "@/utils/buttons/ButtonValidatorImpl";

export default {
  name: "ButtonTable",
  inheritAttrs: true,
  data() {
    return {
      columnMinWidth: 200,
      columnPosMinWidth: 80,
      options: [
        {
          value: buttonTypes.messageBack,
          label: buttonTypes.messageBack,
        },
        {
          value: buttonTypes.openUrl,
          label: buttonTypes.openUrl,
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
      return this.$store.getters.buttonValidations.inputEmpty;
    },
    getTitleDuplicate() {
      return this.$store.getters.buttonValidations.titleDuplicate;
    },
    getVirtualIntents() {
      return this.$store.getters.virtualIntents;
    },
    getOrderNumbers(){
      return Array.from({length: (this.currentEditedButtons).length}, (_, i) => i + 1)
    }
  },
  methods: {
    deleteAnswerButton(answerButton) {
      this.$store.dispatch(dispatchNames.deleteAnswerButton, answerButton);
      this.validateButtonsAndSaveStateInStore();
    },
    addAnswerButton() {
      this.$store.dispatch(dispatchNames.addNewAnswerButton, this.currentEditedButtons.length);
      this.validateButtonsAndSaveStateInStore();
    },
    validateButtonsAndSaveStateInStore() {
      const buttonValidator = new ButtonValidatorImpl(this.currentEditedButtons);
      const buttonUtilities = new ButtonUtilities(this.$store, buttonValidator);
      buttonUtilities.validateButtonsAndSaveStateInStore();
    },
    isInvalidUrlButton(button) {
      return ButtonValidatorImpl.isInvalidUrlButton(button);
    },
    isMessageBackButton(button) {
      return button.type == buttonTypes.messageBack
    },
    isSelectedOption(button) {
      if (this.isMessageBackButton(button)) {
        return button?.virtualIntent == null
      } else {
        return false
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.popOverContent {
  text-align: left;
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
</style>
