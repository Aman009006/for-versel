<template v-if="copiedButtons">
  <el-table :data="copiedButtons" border>
    <el-table-column label="Name" align="center" :min-width="columnMinWidth">
      <template slot-scope="{ row: button }">
        <el-input v-model="button.title" type="textarea" autosize />
      </template>
    </el-table-column>

    <el-table-column align="center" :min-width="columnMinWidth">
      <template slot="header">
        <el-popover
          ref="PopOverValue"
          placement="top-start"
          autosize
          trigger="hover"
        >
          <div class="popOverContent">
            Werte können nur bei Buttons mit dem Typ
            <strong>openUrl</strong>
            bearbeitet werden.
          </div>
        </el-popover>
        <span>
          Wert
          <i v-popover:PopOverValue class="el-icon-info" />
        </span>
      </template>
      <template slot-scope="{ row: button }">
        <el-input
          v-if="!isImbackButton(button)"
          v-model="button.value"
          type="textarea"
          autosize
        />
        <span v-else>{{ button.value }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" :min-width="columnMinWidth">
      <template slot="header">
        <el-popover
          ref="PopOverType"
          placement="top-start"
          autosize
          trigger="hover"
        >
          <div class="popOverContent">
            Der Typ eines Buttons kann
            <strong>nicht</strong>
            geändert werden.
          </div>
        </el-popover>
        <span>
          Typ
          <i v-popover:PopOverType class="el-icon-info" />
        </span>
      </template>
      <template slot-scope="{ row: button }">
        <span>{{ button.type }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "ButtonTable",
  props: ["buttons"],
  data() {
    return {
      columnMinWidth: 200,
    };
  },
  computed: {
    copiedButtons() {
      if (this.buttons != null) {
        const copiedButtons = JSON.parse(JSON.stringify(this.buttons));
        return copiedButtons;
      }
      return null;
    },
  },
  methods: {
    isImbackButton(button) {
      return button.type == "imBack";
    },
  },
};
</script>

<style scoped lang="scss">
.popOverContent {
  text-align: center;
}
</style>