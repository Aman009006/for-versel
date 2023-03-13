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
      <el-button v-if="adminUiTestPageLink == null && isDefaultEntity()" @click="startDialogForcurrentIntent()">
        Antwort im Bot prüfen
      </el-button>
      <el-button v-else-if="adminUiTestPageLink != null" @click="openLink(adminUiTestPageLink)">
        Testseite öffnen
      </el-button>
    </div>
  </div>
</template>

<script>
import { defaultEntity } from "@/constants";
import IntentNameGenerator from "@/utils/intents/IntentNameGenerator";

export default {
  props: ["intent", "description", "utterances", "adminUiTestPageLink", "entity"],
  computed: {
    technicalIntentName() {
      const intentNameGenerator = new IntentNameGenerator(this.intent, this.entity);
      return intentNameGenerator.getTechnicalIntentName();
    }
  },
  methods: {
    startDialogForcurrentIntent() {
      window.hsag_chatbot.api.startDialog(this.intent);
    },
    openLink(link) {
      window.open(link, "_blank");
    },
    isDefaultEntity() {
      return this.entity.entityName == defaultEntity.entityName
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.dialogInfoBox {
  background-color: white;
  padding: 5px 25px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 14px;
  color: $darkGrey;
}

.utterancesTitle {
  font-size: 13px;
  color: #409eff;
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
