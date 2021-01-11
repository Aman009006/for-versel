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
            <el-button
              class="edit-btn"
              size="small"
              icon="el-icon-edit"
              @click="toggleEdit(row)"
            >
              Bearbeiten
            </el-button>
          </template>
          <el-table :data="row.buttons" border style="width: 90%" stripe>
            <el-table-column align="center" label="Typ von Button" prop="type" width="130" />
            <el-table-column align="center" label="Name von Button" prop="title" width="260" />
            <el-table-column align="center" label="Wert von Button" prop="value">
              <template slot-scope="{row}">
                <template v-if="row.edit">
                  <el-input v-model="row.value" type="textarea" autosize />
                </template>
                <template v-else>
                  <span>{{ row.value }}</span>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAnswersforIntent } from '@/api/answers'
import { setAnswerText } from '@/api/answers'
// import { setButtonProperties } from '@/api/answers'
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
    toggleEdit(row) {
      row.edit = !row.edit
      for (const button of row.buttons) {
        button.edit = !button.edit
      }
    },
    async loadAnswers() {
      this.answers = await getAnswersforIntent(this.$route.meta.title)
      for (const answer of this.answers) {
        // for each answer set editing mode at false
        this.$set(answer, 'edit', false)
        // for each answer remember the current text value
        this.$set(answer, 'originalText', answer.text)
        // todo: for each button if exists, remember the current values of its properties
        if (answer.buttons) {
          for (const button of answer.buttons) {
            this.$set(button, 'edit', false)
          }
        }
      }
      // now the data is filled and can be used
      this.dataReady = true
    },
    cancelEdit(row) {
      // set the text at the previous value
      row.text = row.originalText
      // TODO:  set the properties of all buttons at the previous values (at first only name)
      // the editing mode is off now
      row.edit = false
      // give the cancelling message
      this.$message({
        message: 'Der Text wurde auf den vorherigen Wert gesetzt.',
        type: 'warning'
      })
    },
    checkIfButtonsPropertiesChanged(row) {
    // TODO
    },
    async confirmEdit(row) {
      // the editing mode is off now
      row.edit = false
      let changesMade = false
      // if the user has changed the answer text in the current row
      if (row.originalText !== row.text) {
        // send the changed data to the BE which makes the changes in DB
        await setAnswerText(row.id, row.text).then(response => {
          // fullfilment: then update data because it was changed in DB
          row.originalText = row.text
          changesMade = true
        }, reason => {
          // rejection: then set the answer at the previous value
          row.text = row.originalText
        })
      }
      // TODO: if the user has changed any button properties in the current row
      // if the user has done NO changes in the row
      if (!changesMade) {
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
