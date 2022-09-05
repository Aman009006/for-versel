<template>
  <el-table :data="copiedButtons" border>
    <el-table-column label="Name" align="center" :min-width="columnMinWidth">
      <template #button="{ row: button }">
        <el-input v-model="button.title" type="textarea" autosize />
      </template>
    </el-table-column>

    <el-table-column align="center" :min-width="columnMinWidth">
      <template #header="header">
        Wert
        <el-popover
          ref="PopOverValue"
          placement="top-start"
          :width="400"
          trigger="hover"
        >
          <template #reference>
            <el-icon><el-icon-info /></el-icon>
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
      <template #button="{ row: button }">
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
      <template #header="header">
        Typ
        <el-popover
          ref="PopOverType"
          placement="top-start"
          :width="400"
          trigger="hover"
        >
          <template #reference>
            <el-icon><el-icon-info /></el-icon>
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
      <template #button="{ row: button }">
        <span>{{ button.type }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { InfoFilled as ElIconInfo } from "@element-plus/icons";
export default {
  name: "ButtonTable",
  components: {
    ElIconInfo,
  },
  inheritAttrs: true,
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

<style lang="scss" scoped>
.popOverContent {
  text-align: center;
}
</style>
