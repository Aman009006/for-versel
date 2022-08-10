<template>
  <div class="intent-element-container">
    <template v-if="dataReady">
      <h1 style="font-size: 18px">{{ $route.meta.title }}</h1>

      <DialogInfoBox
        :intent="$route.meta.intent"
        :description="$route.meta.description"
        :utterances="utterances"
        :adminUiTestPageLink="$store.getters.metainfo.admin_ui_test_page_link"
      />

      <el-row
        v-if="
          answerConfig != null &&
          answerConfig.readable_redirect_to_intent_name != null
        "
        class="redirectionMessage"
        :gutter="20"
      >
        <el-col :md="20" :span="24">
          <el-alert type="warning" center show-icon :closable="false">
            <p>
              Dieser Intent wird weitergeleitet auf
              <span style="font-weight: bold"
                >"{{ answerConfig.readable_redirect_to_intent_name }}"</span
              >.
            </p>
            <p>
              Bitte beachten Sie: Bei Weiterleitungen wird der Antworttext des
              Intents angezeigt, auf den weitergeleitet wurde. Daher können Sie
              die untenstehende Tabelle nicht bearbeiten. Zur Bearbeitung des
              Antworttextes klicken Sie bitte auf den Button
              <span style="font-weight: bold">"Weiterleitung folgen"</span>.
            </p>
            <p>
              Aktuell können Sie diesen Intent über unseren Support aktivieren
              lassen. Erstellen Sie hierfür bitte ein Ticket in unserem Ticket
              System. <br /><span style="font-weight: bold">Feature Info:</span>
              In Kürze wird die Intent Aktivierung per Klick über die Admin UI
              möglich sein.
            </p>
          </el-alert>
        </el-col>
        <el-col :md="4" :span="24" class="buttonContainer">
          <!-- <el-button type="warning"> -->
          <router-link
            :to="{
              name: 'intent-' + answerConfig.readable_redirect_to_intent_name,
            }"
            tag="button"
            class="el-button el-button--warning el-button--medium"
          >
            Weiterleitung folgen
          </router-link>
          <!-- </el-button> -->
          <el-button class="link-button">
            <a :href="jiraHelpDesk" target="_blank"> Support kontaktieren </a>
          </el-button>
        </el-col>
      </el-row>
      <div class="table-container">
        <div
          v-if="
            answerConfig != null &&
            answerConfig.readable_redirect_to_intent_name != null
          "
          class="disabled-layer"
        />
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
          >
            <template slot-scope="{ row }">
              <!-- When the editing mode is turned on: -->
              <template v-if="row.edit">
                <el-input
                  v-model="row.text"
                  type="textarea"
                  autosize
                  class="edit-input"
                />
              </template>
              <!-- When the editing mode is turned off: -->
              <template v-else>
                <div class="text-input">
                  <span class="text-input">{{ row.text }}</span>
                </div>
              </template>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Buttons" width="500">
            <template slot-scope="{ row }">
              <template v-if="row.buttons">
                <ButtonList :buttons="row.buttons" />
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
            <template slot-scope="{ row }">
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
import { getAnswersforIntent } from "@/api/answers";
import { setAnswerText } from "@/api/answers";
import { setButtonProperties } from "@/api/answers";
import { links, dispatchNames } from "@/constants";
import refreshRoutes from "@/utils/routes/refreshRoutes";
import { getNewIntentRoutes } from "@/utils/routes/intentRoutes";
import ButtonList from "@/components/ButtonList";
import DialogInfoBox from "@/components/DialogInfoBox";

// import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  name: "Intent",
  components: {
    ButtonList,
    DialogInfoBox,
  },
  props: {},
  data() {
    return {
      dataReady: false,
      answers: [],
      answerConfig: {},
      jiraHelpDesk: links.jiraHelpDesk,
    };
  },
  computed: {
    utterances() {
      const searchedIntent = this.$route.meta.title;
      // use the data from the store
      const skillsWithIntents = this.$store.getters.skillsWithIntents;
      for (const next of skillsWithIntents) {
        for (const intent of next.Intents) {
          // find the current intent and get its utterances
          if (intent.name === searchedIntent) {
            return intent.utterances;
          }
        }
      }
      return null;
    },
    permissionRoutes: function () {
      return this.$store.getters.permission_routes;
    },
  },
  async created() {
    /**
     * Fetch the data when the view is created
     * and the data is already being observed
     */
    await this.loadAnswers();
  },
  async mounted() {},
  methods: {
    async refreshRoutesIfNewIntentWasClicked() {
      const newIntentRoutes = getNewIntentRoutes(this.permissionRoutes);
      const routeNames = newIntentRoutes.map((intentRoute) => intentRoute.name);
      if (routeNames.includes(this.$route.name)) {
        await refreshRoutes();
      }
    },
    async loadAnswers() {
      const answerInfo = await getAnswersforIntent(this.$route.meta.title);
      this.refreshRoutesIfNewIntentWasClicked();
      this.answers = answerInfo.answers;
      this.answerConfig = answerInfo.answerConfig;
      for (const answer of this.answers) {
        // for each answer set editing mode at false
        this.$set(answer, "edit", false);
        // for each answer remember the current text value
        this.$set(answer, "originalText", answer.text);
        // for each button set editing mode at false and note the current values of its props
        if (answer.buttons) {
          for (const button of answer.buttons) {
            this.$set(button, "answerId", answer.id);
            this.$set(button, "edit", false);
            this.$set(button, "originalButtonTitle", button.title);
            this.$set(button, "originalButtonType", button.type);
            this.$set(button, "originalButtonValue", button.value);
          }
        }
      }
      // now the data is filled and can be used
      this.dataReady = true;
    },
    toggleEdit(row) {
      row.edit = !row.edit;
    },
    cancelEdit(row) {
      // set the text at the previous value
      row.text = row.originalText;
      // the editing mode is off now
      row.edit = false;
      // for each button set editing mode at false and set props at previous values
      if (row.buttons) {
        for (const button of row.buttons) {
          this.resetButtonPropertiesAtPrevValues(button);
        }
      }
      // give the cancelling message
      this.$message({
        message: "Die Änderungen wurden abgebrochen.",
        type: "warning",
      });
    },
    checkIfButtonPropertiesChanged(button) {
      if (
        button.originalButtonType !== button.type ||
        button.originalButtonValue !== button.value ||
        button.originalButtonTitle !== button.title
      ) {
        return true;
      }
      return false;
    },
    resetButtonPropertiesAtPrevValues(button) {
      button.edit = false;
      button.title = button.originalButtonTitle;
      button.type = button.originalButtonType;
      button.value = button.originalButtonValue;
    },
    async confirmEdit(row) {
      // the editing mode is off for the current answer
      row.edit = false;
      let changesMade = false;
      // if the user has changed the answer text in the current row
      if (row.originalText !== row.text) {
        // send the changed data to the BE which makes the changes in DB
        await setAnswerText(row.id, row.text).then(
          (response) => {
            // fullfilment: then update data because it was changed in DB
            row.originalText = row.text;
            changesMade = true;
          },
          (reason) => {
            // rejection: then set the answer at the previous value
            row.text = row.originalText;
          }
        );
      }
      // for each button check if it is changed and save it in the DB
      for (const button of row.buttons) {
        if (this.checkIfButtonPropertiesChanged(button)) {
          // save the changes in the DB
          await setButtonProperties(
            button.answerId,
            button.originalButtonTitle,
            button.title,
            button.type,
            button.value
          ).then(
            (response) => {
              // turn off the editing mode, because the changes are already received here
              button.edit = false;
              // set the old values of the button at the new ones
              button.originalButtonTitle = button.title;
              button.originalButtonType = button.type;
              button.originalButtonValue = button.value;
              // set the flag that changes are made
              changesMade = true;
            },
            (reason) => {
              // rejection: then set at the previous value
              this.resetButtonPropertiesAtPrevValues(button);
            }
          );
        } else {
          // the button was not changed, therefore just turn off the editing mode
          button.edit = false;
        }
      }
      // if the user has done NO changes in the row
      if (!changesMade) {
        // set the info message for this case
        this.$message({
          message: "Es wurden keine Änderungen gemacht",
          type: "warning",
        });
      } else {
        this.$store.dispatch(dispatchNames.setSkillsAndIntentsFullQualified);
      }
    },
  },
};
</script>

<style scoped lang="scss">
$grey: #8080807a;
$white: #ffffff8c;

.intent-element-container {
  padding: 0px 15px;
}

.el-table {
  font-size: 13px !important;
}

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

.redirectionMessage {
  color: red;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: underline;
  }

  .buttonContainer {
    display: flex;
    flex-direction: column;
    max-width: 350px;
    margin-top: 15px;

    button {
      margin-left: 0px;
      white-space: normal;
      &:first-child {
        margin-bottom: 20px;
        height: 65px;
      }
    }
  }
}

.redirectionMessage a {
  text-decoration: underline;
}

.popOverContent {
  text-align: center;
}
.cancel-btn,
.confirm-btn,
.edit-btn {
  border-radius: 9px !important;
  // border-color: black;
  margin-left: 0px !important;
  width: 100%;
  + button {
    margin-top: 5px;
  }
}

.cancel-btn {
  color: white !important;
  background-color: #fa4c4c !important;
  border-color: #fa4c4c !important;
}

.cancel-btn:hover {
  color: white !important;
  background-color: #f78989 !important;
  border-color: #f78989 !important;
}

.confirm-btn {
  color: white !important;
  background-color: #63c731 !important;
  border-color: #63c731 !important;
}

.confirm-btn:hover {
  color: white !important;
  background-color: #85ce61 !important;
  border-color: #85ce61 !important;
}

.edit-btn {
  border: solid #409eff 2px !important;
  color: white !important;
  background-color: #409eff !important;
}
.edit-btn:hover {
  border: solid #66b1ff 2px !important;
  color: white !important;
  background-color: #66b1ff !important;
}
</style>
