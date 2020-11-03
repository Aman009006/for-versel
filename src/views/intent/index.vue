<template>
  <div v-if="dataReady">
    <h1>{{ $route.meta.title }}</h1>
    <el-table :data="answers" class="answers_table" border style="width: 95%" stripe>
      <el-table-column align="center" label="Name" prop="name" width="100" />
      <el-table-column align="center" label="Beschreibung" prop="description" width="150" />
      <el-table-column align="center" label="Antworttext" prop="text">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.text" class="edit-input" type="textarea" autosize size="small" />
            <el-button
              class="confirm-btn"
              size="small"
              icon="el-icon-download"
              @click="confirmEdit(row)"
            >
              Speichern
            </el-button>
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
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
import { setAnswerText } from '@/api/answers'
export default {
  name: 'Intent',
  props: {},
  data() {
    return {
      dataReady: false,
      answers: []
    }
  },
  async created() {
    // fetch the data when the view is created and the data is
    // already being observed
    await this.updateAnswers()
  },
  async mounted() {},
  methods: {
    async updateAnswers() {
      this.answers = await getAnswersforIntent(this.$route.meta.title)
      for (const answer of this.answers) {
        // for each answer set editing mode at false
        this.$set(answer, 'edit', false)
        // for each answer remember the current text value
        answer.originalText = answer.text
      }
      // now the data is filled and can be used
      this.dataReady = true
    },
    cancelEdit(row) {
      // set the text at the previous value
      row.text = row.originalText
      // the editing mode is off now
      row.edit = false
      // give the cancelling message
      this.$message({
        message: 'Der Text wurde auf den vorherigen Wert gesetzt.',
        type: 'warning'
      })
    },
    async confirmEdit(row) {
      // the editing mode is off now
      row.edit = false
      // send the changed data to the BE which makes the changes in DB
      await setAnswerText(row.id, row.text).then(
        function(ready) {
          // if saving in DB was successful
          if (ready) {
            // update data because it was changed in DB
            row.originalText = row.text
            // give the confirmimg message
            this.$message({
              message: 'Die Änderung wurde gespeichert.',
              type: 'success'
            })
          } else {
            this.$message({
              message: 'Die Änderung wurde wegen Fehlen in DB nicht gespeichert.',
              type: 'warnung'
            })
          }
        }
      )
    }
  }
}
</script>

<style scoped>
.answers_table{
  left: 30px;
}
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
  color: white;
  background-color:rgb(204, 58, 58);
  border-radius:9px!important;
  border-color: black;
}
.confirm-btn {
  position: absolute;
  right: 150px;
  top: 10px;
  color: white;
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
