<template>
  <div class="intent-element-container">
    <template v-if="dataReady">
      <DialogInfoBox
        :intent="$route.meta.intent"
        :description="$route.meta.description"
        :utterances="utterances"
        :adminUiTestPageLink="$store.getters.metainfo.admin_ui_test_page_link"
        :entity="$route.meta.entity"
        :parentPath="parentPath"
        :readable-intent-name="readableIntentName"
        :intent-group="intentGroup" />

      <RedirectionInfoBox
        v-if="answerConfig != null"
        :readableRedirectToIntentName="answerConfig.redirectToVirtualIntentName
          " />
      <IncomingRedirects
        v-if="redirectData.length > 0"
        :incomingRedirectsArray="redirectData" />
      <AnswerTable
        :disabled="isRedirectedToOtherIntent()"
        :answers="answers"
        :answerConfig="answerConfig"
        :readableIntentName="readableIntentName"/>
    </template>
  </div>
</template>

<script>
import refreshRoutes from "@/utils/routes/refreshRoutes";
import { getNewIntentRoutes } from "@/utils/routes/intentRoutes";
import DialogInfoBox from "@/components/Dialogs/DialogInfoBox/index.vue";
import RedirectionInfoBox from "@/components/Dialogs/RedirectionInfoBox/index.vue";
import AnswerTable from "@/components/Dialogs/AnswerTable/index.vue";
import { dispatchNames } from "@/constants";
import { addActiveToSidebar, removeActiveFromSidebar } from "@/utils/sidebar/sidebarUtils";
import LastClickedIntent from "@/utils/LastClickedIntent"
import IntentNameGenerator from "@/utils/intents/IntentNameGenerator";
import IncomingRedirects from "@/components/Dialogs/IncomingRedirects/index.vue";

export default {
  name: "Intent",
  components: {
    DialogInfoBox,
    RedirectionInfoBox,
    IncomingRedirects,
    AnswerTable,
  },
  props: {},
  data() {
    return {
      dataReady: false,
      parentPath: this.$route.meta.parentPath,
      technicalIntent: this.technicalIntentName(),
      intentGroup: this.$route.meta.intentGroup,
    };
  },
  mounted() {
    addActiveToSidebar('is-intent');
    this.setIntentSessionStorage(this.technicalIntent);
  },
  unmounted() {
    removeActiveFromSidebar('is-intent');
  },
  computed: {
    intentInfo() {
      return this.$store.getters.intents[this.readableIntentName];
    },
    answers() {
      return this.intentInfo.answers;
    },
    answerConfig() {
      return this.intentInfo.answerConfig;
    },
    utterances() {
      const searchedIntent = this.readableIntentName;
      const skillsWithIntents = this.$store.getters.skillsWithIntents;
      for (const next of skillsWithIntents) {
        for (const intent of next.Intents) {
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
    readableIntentName() {
      return this.$route.meta.title;
    },
    redirectData() {
      return this.getRedirectData();
    },
  },
  async created() {
    await this.loadAnswers();
    this.refreshRoutesIfNewIntentWasClicked();
  },
  methods: {
    technicalIntentName() {
      const intentNameGenerator = new IntentNameGenerator(this.$route.meta.intent, this.$route.meta.entity);
      return intentNameGenerator.getTechnicalIntentName();
    },
    isRedirectedToOtherIntent() {
      return this.answerConfig?.redirectToVirtualIntentName != null;
    },
    setIntentSessionStorage(intent) {
      const lastClickedIntent = new LastClickedIntent(intent, this.intentGroup).addDataToSession();
      return lastClickedIntent;
    },
    async refreshRoutesIfNewIntentWasClicked() {
      const newIntentRoutes = getNewIntentRoutes(this.permissionRoutes);
      const routeNames = newIntentRoutes.map((intentRoute) => intentRoute.name);
      if (routeNames.includes(this.$route.name)) {
        await refreshRoutes();
      }
    },

    async loadAnswers() {
      await this.$store.dispatch(
        dispatchNames.getAndSetIntentAnswers,
        this.readableIntentName
      );
      this.dataReady = true;
    },
    getRedirectData() {
      const skillsWithIntents = this.$store.state.permission.skillsWithIntents;
      const redirectMatched = [];
      for (const skill of skillsWithIntents) {
        for (const intent of skill.Intents) {
          if (intent.answers.redirectsTo === this.$route.meta.title) {
            redirectMatched.push({
              name: intent.name
            });
          }
        }
      }
      return redirectMatched;
    }
  },
};
</script>

<style lang="scss" scoped>
.intent-element-container {
  padding: 0px 50px 30px 50px;

  h1 {
    margin-top: 0;
  }
}
</style>
