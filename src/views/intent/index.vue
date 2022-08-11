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

      <RedirectionInfoBox
        :readableRedirectToIntentName="
          answerConfig.readable_redirect_to_intent_name
        "
      />

      <AnswerTable :disabled="isRedirectedToOtherIntent()" :answers="answers" />
    </template>
  </div>
</template>

<script>
import { getAnswersforIntent } from "@/api/answers";
import refreshRoutes from "@/utils/routes/refreshRoutes";
import { getNewIntentRoutes } from "@/utils/routes/intentRoutes";
import DialogInfoBox from "@/components/Dialogs/DialogInfoBox";
import RedirectionInfoBox from "@/components/Dialogs/RedirectionInfoBox";
import AnswerTable from "@/components/Dialogs/AnswerTable";

// import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  name: "Intent",
  components: {
    DialogInfoBox,
    RedirectionInfoBox,
    AnswerTable,
  },
  props: {},
  data() {
    return {
      dataReady: false,
      answers: [],
      answerConfig: {},
    };
  },
  computed: {
    utterances() {
      const searchedIntent = this.readableIntentName;
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
    readableIntentName() {
      return this.$route.meta.title;
    },
  },
  async created() {
    /**
     * Fetch the data when the view is created
     * and the data is already being observed
     */
    await this.loadAnswers();
    this.refreshRoutesIfNewIntentWasClicked();
  },
  async mounted() {},
  methods: {
    isRedirectedToOtherIntent() {
      return this.answerConfig.readable_redirect_to_intent_name != null;
    },

    async refreshRoutesIfNewIntentWasClicked() {
      const newIntentRoutes = getNewIntentRoutes(this.permissionRoutes);
      const routeNames = newIntentRoutes.map((intentRoute) => intentRoute.name);
      if (routeNames.includes(this.$route.name)) {
        await refreshRoutes();
      }
    },

    async loadAnswers() {
      const answerInfo = await getAnswersforIntent(this.readableIntentName);
      this.answers = answerInfo.answers;
      this.answerConfig = answerInfo.answerConfig;
      this.dataReady = true;
    },
  },
};
</script>

<style scoped lang="scss">

.intent-element-container {
  padding: 0px 15px;
}

</style>
