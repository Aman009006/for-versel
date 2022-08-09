<template v-if="buttons">
  <el-table :data="buttons">
    <el-table-column label="Name">
      <template slot-scope="{ row: button }">
        <el-input v-model="button.title" type="textarea" autosize />
      </template>
    </el-table-column>

    <el-table-column label="Wert">
      <template slot-scope="{ row: button }">
        <template v-if="!isImbackButton(button)">
          <el-input v-model="button.value" type="textarea" autosize />
        </template>
        <template v-else>
          <span>{{ button.value }}</span>
        </template>
      </template>
    </el-table-column>

    <el-table-column label="Typ"> </el-table-column>
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
