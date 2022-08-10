<template>
  <div class="table-container">
    <div v-if="disabled" class="disabled-layer" />
    <el-table :data="answers" class="answers_table" border>
      <el-table-column
        align="center"
        label="Beschreibung"
        prop="description"
        width="150"
      />

      <el-table-column
        align="center"
        label="Antworttext"
        prop="text"
        autosize
      />

      <el-table-column align="center" label="Buttons" width="500">
        <template slot-scope="{ row: answer }">
          <template v-if="answer.buttons">
            <ButtonList :buttons="answer.buttons" />
          </template>
          <template v-else>
            <el-alert
              title="Diese Antwort hat keine Buttons"
              type="info"
              :closable="false"
              center
            />
          </template>
        </template>
      </el-table-column>

      <el-table-column align="center" width="130">
        <template slot-scope="{ row: answer }">
          <el-button
            class="edit-btn"
            size="small"
            icon="el-icon-edit"
            @click="openEditModal(answer)"
          >
            Bearbeiten
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["disabled"],
  methods: {
    openEditModal(row) {
      // TODO: implement
    },
  },
};
</script>