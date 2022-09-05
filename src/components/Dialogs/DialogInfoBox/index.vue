<template>
  <div class="dialogInfoBox">
    <h5 class="utterancesTitle">Intentname:</h5>
    <div>{{ intent }}</div>
    <h5 class="utterancesTitle">Beschreibung:</h5>
    <div>{{ description }}</div>
    <template v-if="utterances && utterances[0]">
      <h5 class="utterancesTitle">Beispieleingaben:</h5>
      <ul class="utterances">
        <li v-for="utterance in utterances" :key="utterance">
          {{ utterance }}
        </li>
      </ul>
    </template>
    <div class="testButtonContainer">
      <el-button
        v-if="adminUiTestPageLink == null"
        @click="startDialogForcurrentIntent()"
      >
        Antwort im Bot prüfen
      </el-button>
      <el-button v-else @click="openLink(adminUiTestPageLink)">
        Testseite öffnen
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['intent', 'description', 'utterances', 'adminUiTestPageLink'],
  methods: {
    startDialogForcurrentIntent() {
      window.hsag_chatbot.api.startDialog(this.intent)
    },
    openLink(link) {
      window.open(link, '_blank')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

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
