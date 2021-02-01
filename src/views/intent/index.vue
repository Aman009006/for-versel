<template>
  <div class="intent-element-container">
    <template v-if="dataReady">
      <h1>{{ $route.meta.title }}</h1>
      <h2>{{ $route.meta.description }}</h2>
      <template v-if="utterances && utterances[0]">
        <div>Beispielangaben:</div>
        <ul class="utterances">
          <li v-for="item in utterances" :key="item">
            {{ item }}
          </li>
        </ul>
      </template>
      <h2 v-if="answerConfig != null && answerConfig.readable_redirect_to_intent_name != null" class="redirectionMessage">
        Weiterleitung in intent:
        <router-link :to="{name: 'intent-' + answerConfig.readable_redirect_to_intent_name}">
          {{ answerConfig.readable_redirect_to_intent_name }}
        </router-link>
      </h2>
      <div class="table-container">
        <div v-if="answerConfig != null && answerConfig.readable_redirect_to_intent_name != null" class="disabled-layer" />
        <el-table :data="answers" class="answers_table" border style="width: 95%">
          <el-table-column align="center" label="Identifikator" prop="readableName" width="110" />
          <el-table-column align="center" label="Beschreibung des Identifikators" prop="description" width="150" />
          <el-table-column align="center" label="Antworttext (ggf. mit Buttons in der Tabelle)" prop="text" autosize>
            <template slot-scope="{row}">
              <!-- When the editing mode is turned on: -->
              <template v-if="row.edit">
                <el-input v-model="row.text" type="textarea" autosize class="edit-input" />
              </template>
              <!-- When the editing mode is turned off: -->
              <template v-else>
                <div class="text-input">
                  <span class="text-input">{{ row.text }}</span>
                </div>
              </template>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Button" width="500">
            <template slot-scope="{row}">
              <!-- show the table with buttons only if it is not empty -->
              <template v-if="row.buttons">
                <!-- Table with buttons -->
                <el-table :data="row.buttons" border style="width: 100%" stripe>
                  <!-- Column for the button title -->
                  <el-table-column align="center" label="Name" prop="title" autosize>
                    <template slot-scope="{row}">
                      <!-- If editing mode is on and the button has no type imBack -->
                      <template v-if="row.edit">
                        <!-- Show the current title in the textarea which can be edited-->
                        <el-input v-model="row.title" type="textarea" autosize />
                      </template>
                      <!-- If editing mode is off -->
                      <template v-else>
                        <!-- show the current value -->
                        <span>{{ row.title }}</span>
                      </template>
                    </template>
                  </el-table-column>
                  <!-- Column for the button value -->
                  <el-table-column align="center" label="Wert" prop="value">
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
                  <el-table-column align="center" label="Typ" prop="type" width="80">
                    <template slot-scope="{row}">
                      <span>{{ row.type }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
              <template v-else>
                <el-alert title="Diese Antwort hat keine Buttons" type="info" :closable="false" center show-icon />
              </template>
            </template>
          </el-table-column>
          <el-table-column align="center" width="130">
            <template slot-scope="{row}">
              <!-- When the editing mode is turned on: -->
              <template v-if="row.edit">
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
                <el-button
                  class="edit-btn"
                  size="small"
                  icon="el-icon-edit"
                  @click="toggleEdit(row)"
                >
                  Bearbeiten
                </el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
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
   computed: {
     // try to use the data from the state
    utterances() {
      const searchedIntent = this.$route.meta.title
      const skillsWithIntents = this.$store.getters.skillsWithIntents
      for (const next of skillsWithIntents) {
        for (const intent of next.Intents) {
          if (intent.name === searchedIntent) {
            return intent.utterances
          }
        }
      }
      return null
    }
  },
  async created() {
    /**
     * Fetch the data when the view is created
     * and the data is already being observed
     */
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
      // for each button set editing mode at false and set props at previous values
      if (row.buttons) {
        for (const button of row.buttons) {
          this.resetButtonPropertiesAtPrevValues(button)
        }
      }
      // give the cancelling message
      this.$message({
        message: 'Die Änderungen wurden abgebrochen.',
        type: 'warning'
      })
    },
    checkIfButtonPropertiesChanged(button) {
      if (button.originalButtonType !== button.type ||
          button.originalButtonValue !== button.value ||
          button.originalButtonTitle !== button.title) {
        return true
      }
      return false
    },
    resetButtonPropertiesAtPrevValues(button) {
      button.edit = false
      button.title = button.originalButtonTitle
      button.type = button.originalButtonType
      button.value = button.originalButtonValue
    },
    async confirmEdit(row) {
      // the editing mode is off for the current answer
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
      // for each button check if it is changed and save it in the DB
      for (const button of row.buttons) {
        if (this.checkIfButtonPropertiesChanged(button)) {
          // save the changes in the DB
          await setButtonProperties(button.answerId, button.originalButtonTitle, button.title, button.type, button.value).then(response => {
            // turn off the editing mode, because the changes are already received here
            button.edit = false
            // set the old values of the button at the new ones
            button.originalButtonTitle = button.title
            button.originalButtonType = button.type
            button.originalButtonValue = button.value
            // set the flag that changes are made
            changesMade = true
          }, reason => {
          // rejection: then set at the previous value
            this.resetButtonPropertiesAtPrevValues(button)
          })
        } else {
          // the button was not changed, therefore just turn off the editing mode
          button.edit = false
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

.utterances {
  font-style: italic;
}

.redirectionMessage {
  color: red;
}

.redirectionMessage a {
  text-decoration: underline;
}

.cancel-btn {
  position: absolute;
  right: 10px;
  top: 60px;
  color: white;
  background-color:rgb(204, 58, 58);
  border-radius:9px!important;
  border-color: black;
}
.confirm-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  color: white;
  background-color: rgb(17, 121, 206);
  border-radius:9px!important;
  border-color: black;
}
.edit-btn {
  position: absolute;
  right: 10px;
  top: 6px;
  color: black;
  background-color: white;
  border-radius:9px!important;
  border-color: black;
}
</style>
