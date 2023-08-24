<template>
  <div class="dialogInfoBox">
    <div class="dialogInfoBox-headline">
      <a :href="parentPath">
        <span class="svg-container">
          <svg-icon :svg-icon-html="icons.arrowleft" />
        </span>
      </a>
      <div>
        <h2>Dialoge / {{ intentGroup }}</h2>
        <h1>{{ readableIntentName }}</h1>
      </div>
    </div>
    <div class="dialogInfoBox-technical">
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
    </div>
    <div>
      <div class="testButtonContainer">
        <el-button v-if="adminUiTestPageLink == null" @click="startDialogForcurrentIntent()">
          Antwort im Bot prüfen
        </el-button>
        <el-button v-else-if="adminUiTestPageLink != null" @click="openLink(adminUiTestPageLink)">
          Testseite öffnen
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import IntentNameGenerator from "@/utils/intents/IntentNameGenerator";
import WebchatApi from "@/utils/WebchatApi";
import icons from "@/icons/index";

export default {
  name: "DialogInfoBox",
  props: ["intent", "description", "utterances", "adminUiTestPageLink", "entity", "parentPath", "readableIntentName", "intentGroup"],
  data() {
    return {};
  },
  computed: {
    technicalIntentName() {
      const intentNameGenerator = new IntentNameGenerator(this.intent, this.entity);
      return intentNameGenerator.getTechnicalIntentName();
    },
    icons() {
      return icons;
    },
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

a {
  display: flex;
  align-items: center;
  margin-right: 20px;

  .svg-container {
    display: flex;
    align-items: center;
    color: $hsag-black;
    width: 50px;
    padding: 0 15px;
  }
}

.dialogInfoBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: $hsag-lightgrey;
  padding: 20px 20px;
  margin-bottom: 20px;
  border-radius: 4px;
  color: $hsag-black;

  .dialogInfoBox-headline{
    display: flex;
    flex-direction: row;
    align-items: center;

    h1{
      margin: 0;
    }

    h2{
      font-weight: normal;
      margin: 0;
    }
  }
  .dialogInfoBox-technical{
    font-size: 14px;
  }
}

.utterancesTitle {
  font-size: 13px;
  color: $hsag-black;
  margin-bottom: 0px;
  text-transform: uppercase;

  &:first-child {
    margin-top: 0px;
  }
}

.utterances {
  margin-top: 5px;
}

.testButtonContainer {
  margin-top: 10px;
}
</style>
