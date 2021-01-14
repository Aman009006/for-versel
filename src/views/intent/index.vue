<template>
  <div v-if="dataReady" class="intent-element-container">
    <h1>{{ $route.meta.title }}</h1>
    <h2 v-if="answerConfig != null && answerConfig.readable_redirect_to_intent_name != null" class="redirectionMessage">
      Weiterleitung in intent:
      <router-link :to="{name: 'intent-' + answerConfig.readable_redirect_to_intent_name}">
        {{ answerConfig.readable_redirect_to_intent_name }}
      </router-link>
    </h2>
    <div class="table-container">
      <div v-if="answerConfig != null && answerConfig.readable_redirect_to_intent_name != null" class="disabled-layer" />
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
            <!-- Table with buttons -->
            <el-table :data="row.buttons" border style="width: 90%" stripe>
              <!-- Column for the button title -->
              <el-table-column align="center" label="Name von Button" prop="title" width="350">
                <template slot-scope="{row}">
                  <template v-if="row.edit && row.type != 'imBack'">
                    <el-input v-model="row.title" type="textarea" autosize />
                  </template>
                  <template v-else>
                    <span>{{ row.title }}</span>
                  </template>
                </template>
              </el-table-column>
              <!-- Column for the button value -->
              <el-table-column align="center" label="Wert von Button" prop="value">
                <template slot-scope="{row}">
                  <template v-if="row.edit && row.type != 'imBack'">
                    <el-input v-model="row.value" type="textarea" autosize />
                  </template>
                  <template v-else>
                    <span>{{ row.value }}</span>
                  </template>
                </template>
              </el-table-column>
              <!-- Column for the button type -->
              <el-table-column align="center" label="Typ von Button" prop="type" width="130">
                <template slot-scope="{row}">
                  <template v-if="row.edit && row.type != 'imBack'">
                    <el-input v-model="row.type" type="textarea" autosize />
                  </template>
                  <template v-else>
                    <span>{{ row.type }}</span>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getAnswersforIntent } from '@/api/answers'
import { setAnswerText } from '@/api/answers'
import { setButtonProperties } from '@/api/answers'
// import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  name: 'Intent',
  // components: { MarkdownEditor },
  props: {},
  data() {
    return {
      dataReady: false,
      answers: [],
      answerConfig: {}
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
      const answerInfo = await getAnswersforIntent(this.$route.meta.title)
      this.answers = answerInfo.answers
      this.answerConfig = answerInfo.answerConfig
      for (const answer of this.answers) {
        // for each answer set editing mode at false
        this.$set(answer, 'edit', false)
        // for each answer remember the current text value
        this.$set(answer, 'originalText', answer.text)
        // for each button set editing mode at false and note the current values of its props
        if (answer.buttons) {
          for (const button of answer.buttons) {
            this.$set(button, 'answerId', answer.id)
            this.$set(button, 'edit', false)
            this.$set(button, 'originalButtonTitle', button.title)
            this.$set(button, 'originalButtonType', button.type)
            this.$set(button, 'originalButtonValue', button.value)
          }
        }
      }
      // now the data is filled and can be used
      this.dataReady = true
    },
    toggleEdit(row) {
      row.edit = !row.edit
      for (const button of row.buttons) {
        button.edit = !button.edit
      }
    },
    cancelEdit(row) {
      // set the text at the previous value
      row.text = row.originalText
      // the editing mode is off now
      row.edit = false
      // TODO:  set the properties of all buttons at the previous values (at first only name)
      // for each button set editing mode at false and set props at previous values
      if (row.buttons) {
        for (const button of row.buttons) {
          button.edit = false
          button.title = button.originalButtonTitle
          button.type = button.originalButtonType
          button.value = button.originalButtonValue
        }
      }
      // give the cancelling message
      this.$message({
        message: 'Der Text wurde auf den vorherigen Wert gesetzt.',
        type: 'warning'
      })
    },
    checkIfButtonsPropertiesChanged(row) {
      if (row.buttons) {
        for (const button of row.buttons) {
          if (button.originalButtonType !== button.type ||
              button.originalButtonValue !== button.value ||
              button.originalButtonTitle !== button.title) {
            return true
          }
        }
      }
      return false
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
      if (this.checkIfButtonsPropertiesChanged(row)) {
        for (const button of row.buttons) {
          await setButtonProperties(button.answerId, button.originalButtonTitle, button.title, button.type, button.value).then(response => {
            button.edit = false
            button.originalButtonTitle = button.title
            button.originalButtonType = button.type
            button.originalButtonValue = button.value
            changesMade = true
          }, reason => {
          // rejection: then set at the previous value
            button.title = button.originalButtonTitle
            button.type = button.originalButtonType
            button.value = button.originalButtonValue
          })
        }
      }
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

<style scoped lang="scss">
$grey: #8080807a;
$white: #ffffff8c;

.intent-element-container {
  margin-left: 30px;
}

.table-container {
  position: relative;
  .disabled-layer {
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    background: linear-gradient(135deg, $grey, $white, $grey, $white, $grey, $white, $grey, $white, $grey, $white, $grey, $white);
    width: 95%;
  }
}

.redirectionMessage {
  color: red
}

.redirectionMessage a {
  text-decoration: underline
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
