<template v-if="buttons">
  <el-table :data="buttons" border>
    <el-table-column label="Name" align="center">
      <template slot-scope="{ row: button }">
        <el-input v-model="button.title" type="textarea" autosize />
      </template>
    </el-table-column>

    <el-table-column align="center">
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

    <el-table-column align="center">
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
        <span> Typ <i v-popover:PopOverType class="el-icon-info" /> </span>
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
  methods: {
    isImbackButton(button) {
      return button.type == "imBack";
    },
  },
};
</script>
