<template>
  <div v-if="dataReady">
    <h1>{{ $route.meta.title }}</h1>
    <el-table :data="answers" border style="width: 95%" stripe>
      <el-table-column align="center" label="Name" prop="name" width="100" />
      <el-table-column align="center" label="Beschreibung" prop="description" width="150" />
      <el-table-column align="center" label="Antworttext" prop="text">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.text" class="edit-input" type="textarea" autosize size="small" />
            <el-button
              class="confirm-btn"
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="confirmEdit(row)"
            >
              Speichern
            </el-button>
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              Abbrechen
            </el-button>
          </template>
          <template v-else>
            <div class="text-input">
              <span class="text-input">{{ row.text }}</span>
            </div>
            <el-button
              class="edit-btn"
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="row.edit=!row.edit"
            >
              Bearbeiten
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAnswersforIntent } from '@/api/answers'
export default {
  name: 'Intent',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {},
  data() {
    return {
      dataReady: false,
      answers: []
    }
  },
  async created() {
    await this.updateAnswers()
  },
  async mounted() {},
  methods: {
    async updateAnswers() {
      this.answers = await getAnswersforIntent(this.$route.meta.title)
      for (const answer of this.answers) {
        this.$set(answer, 'edit', false)
        answer.originalText = answer.text
      }
      // now the data is filled and can be used
      this.dataReady = true
    },
    cancelEdit(row) {
      row.text = row.originalText
      row.edit = false
      this.$message({
        message: 'Der Text wurde auf den vorherigen Wert gesetzt.',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalText = row.text
      this.$message({
        message: 'Die Änderung wurde gespeichert.',
        type: 'success'
      })

      // input in DB speichern

      //
      // this.answers = await getAnswersforIntent(this.$route.meta.title)
    }
  }
}
</script>

<style scoped>
.edit-input{
  padding-right: 250px;
}
.text-input{
  padding-right: 130px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
  background-color:rgb(204, 58, 58);
  border-radius:9px!important;
  border-color: black;
}
.confirm-btn {
  position: absolute;
  right: 150px;
  top: 10px;
  background-color: rgb(17, 121, 206);
  border-radius:9px!important;
  border-color: black;
}
.edit-btn {
  position: absolute;
  right: 15px;
  top: 6px;
  color: black;
  background-color: white;
  border-radius:9px!important;
  border-color: black;
}
</style>
