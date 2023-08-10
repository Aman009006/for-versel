<template>
  <div class="dialogInfoBox">
    <h5 class="utterancesTitle">technischer Intentname:</h5>
    <div>{{ technicalIntentName }}</div>
    <h5 class="utterancesTitle">Beschreibung:</h5>
    <div class="description">{{ description }}</div>
    <template v-if="utterances && utterances[0]">
      <h5 class="utterancesTitle">Beispieleingaben:</h5>
      <ul class="utterances">
        <li v-for="utterance in utterances" :key="utterance">
          {{ utterance }}
        </li>
      </ul>
    </template>
    <div class="testButtonContainer">
      <el-button v-if="adminUiTestPageLink == null" @click="startDialogForcurrentIntent()">
        Antwort im Bot prüfen
      </el-button>
      <el-button v-else-if="adminUiTestPageLink != null" @click="openLink(adminUiTestPageLink)">
        Testseite öffnen
      </el-button>
    </div>
  </div>
</template>

<script>
import IntentNameGenerator from "@/utils/intents/IntentNameGenerator";
import WebchatApi from "@/utils/WebchatApi";

export default {
  name: "DialogInfoBox",
  props: ["intent", "description", "utterances", "adminUiTestPageLink", "entity"],
  computed: {
    technicalIntentName() {
      const intentNameGenerator = new IntentNameGenerator(this.intent, this.entity);
      return intentNameGenerator.getTechnicalIntentName();
    }
  },
  methods: {
    startDialogForcurrentIntent() {
      new WebchatApi().startDialog(this.technicalIntentName)
    },
    openLink(link) {
      window.open(link, "_blank");
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.dialogInfoBox {
  background-color: $hsag-lightgrey;
  padding: 5px 25px;
  margin-bottom: 20px;
  border-radius: 4px;
  font-size: 14px;
  color: $darkGrey;
}

.utterancesTitle {
  font-size: 13px;
  color: $hsag-black;
  margin-bottom: 0px;
  text-transform: uppercase;
}

.utterances {
  margin-top: 5px;
}

.testButtonContainer {
  margin-top: 10px;
}
</style>
