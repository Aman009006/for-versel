<template>
  <div class="table-container">
    <div v-if="disabled" class="disabled-layer" />
    <el-table :data="answers" border>
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
import ButtonList from "@/components/Dialogs/ButtonList";

export default {
  components: {
    ButtonList,
  },
  props: ["disabled", "answers"],
  methods: {
    openEditModal(row) {
      // TODO: implement
    },
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  position: relative;
  // The chatbot, which has a fixed position, should not cover the table
  margin-bottom: 120px;
  .disabled-layer {
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    background-color: rgb(239 239 239 / 77%);
  }
}
</style>