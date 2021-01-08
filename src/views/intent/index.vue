<template>
  <div v-if="dataReady">
    <h1>{{ $route.meta.title }}</h1>
    <el-table :data="answers" class="answers_table" border style="width: 95%">
      <el-table-column align="center" label="Name" prop="name" width="100" />
      <el-table-column align="center" label="Beschreibung" prop="description" width="150" />
      <el-table-column align="center" label="Antworttext (ggf. mit Buttons in der Tabelle)" prop="text">
        <template slot-scope="{row}">
          <!-- When the editing mode is turned on: -->
          <template v-if="row.edit">
            <el-input v-model="row.text" type="textarea" autosize class="edit-input" />
            <!-- <markdown-editor v-model="row.text" class="edit-input" /> -->
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
          <!-- When the editing mode is turned off: -->
          <template v-else>
            <div class="text-input">
              <span class="text-input">{{ row.text }}</span>
            </div>
            <el-table :data="row.buttons" :show-header="Buttons" border style="width: 90%" stripe>
              <el-header label="Buttons" />
              <el-table-column align="center" label="Typ von Button" prop="type" />
              <el-table-column align="center" label="Name von Button" prop="title" />
              <el-table-column align="center" label="Wert von Button" prop="value" />
              <el-table-column align="center" label="Identifikator von Button" prop="identificator" />
            </el-table>
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
// import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  name: 'Intent',
  // components: { MarkdownEditor },
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
    await this.loadAnswers()
  },
  async mounted() {},
  methods: {
    async loadAnswers() {
      this.answers = await getAnswersforIntent(this.$route.meta.title)
      for (const answer of this.answers) {
        // for each answer set editing mode at false
        this.$set(answer, 'edit', false)
        // for each answer remember the current text value
        this.$set(answer, 'originalText', answer.text)
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
      // if the user has done changes in the row
      if (row.originalText !== row.text) {
        // send the changed data to the BE which makes the changes in DB
        await setAnswerText(row.id, row.text).then(response => {
          // fullfilment: then update data because it was changed in DB
          row.originalText = row.text
        }, reason => {
          // rejection: then set the answer at the previous value
          row.text = row.originalText
        })
      // if the user has done NO changes in the row
      } else {
        // set the info message for this case
        this.$message({
          message: 'Es wurden keine Änderungen gemacht',
          type: 'warning'
        })
      }
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
