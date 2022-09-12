<template>
  <el-table id="answerButtonsTable" :data="copiedButtons" border>
    <el-table-column label="Name" align="center" :min-width="columnMinWidth">
      <template #default="{ row: button }">
        <el-input v-model="button.title" type="textarea" autosize />
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
      <template #default="{ row: button }">
        <el-input v-model="button.value" type="textarea" autosize />
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
      <template #default="{ row: button }">
        <el-select v-model="button.type">
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
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
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
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
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
    handleDelete(index, row) {
      this.tableButtons.filter((button, index) => {
        if (row.title == button.title) {
          delete this.tableButtons[index];
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.popOverContent {
  text-align: center;
}
</style>
