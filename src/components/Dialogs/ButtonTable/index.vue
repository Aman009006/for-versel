<template>
  <div id="tableButtonContainer" style>
    <div id="tableTitleContainer">
      <h2>Buttons</h2>
      <el-button
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
            v-model="scope.row.title"
            type="textarea"
            autosize
            @change="saveButtonsContent(scope.$index, scope.row)"
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
            @change="saveButtonsContent(scope.$index, scope.row)"
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
            @change="saveButtonsContent(scope.$index, scope.row)"
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
    <span></span>
  </div>
</template>

<script>
export default {
  name: "ButtonTable",
  inheritAttrs: true,
  props: ["buttons"],
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
        this.tableButtons = copiedButtons;
        return copiedButtons;
      }
      return null;
    },
  },
  methods: {
    isImbackButton(button) {
      return button.type == "imBack";
    },
    async handleDelete(tableIndex, row) {
      this.tableButtons.splice(tableIndex, 1);
    },
    async saveButtonsContent(index, row) {
      this.tableButtons[index] = row;
    },
    async addAnswerButton() {
      this.tableButtons.push(
        {
          title: "",
          value: "",
          type: "imBack",
          identificator: null
        }
      )
    }
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
</style>
