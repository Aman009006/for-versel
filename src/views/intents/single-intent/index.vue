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

      <AnswerTable
        :disabled="isRedirectedToOtherIntent()"
        :answers="answers"
        :answerConfig="answerConfig" />
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
      parentPath: this.$route.meta.parentPath,
      intentGroup: this.$route.meta.intentGroup,
    };
  },
  mounted() {
    addActiveToSidebar('is-intent');
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
  },
  async created() {
    await this.loadAnswers();
    this.refreshRoutesIfNewIntentWasClicked();
  },
  methods: {
    isRedirectedToOtherIntent() {
      return this.answerConfig?.redirectToVirtualIntentName != null;
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
