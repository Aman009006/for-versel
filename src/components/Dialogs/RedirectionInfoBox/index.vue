<template>
  <el-row
    v-if="readableRedirectToIntentName != null"
    class="redirectionMessage"
    :gutter="20"
  >
    <el-col :md="20" :span="24">
      <el-alert type="warning" center show-icon :closable="false">
        <p>
          Dieser Intent wird weitergeleitet auf
          <span style="font-weight: bold"
            >"{{ readableRedirectToIntentName }}"</span
          >.
        </p>
        <p>
          Bitte beachten Sie: Bei Weiterleitungen wird der Antworttext des
          Intents angezeigt, auf den weitergeleitet wurde. Daher können Sie die
          untenstehende Tabelle nicht bearbeiten. Zur Bearbeitung des
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
          name: 'intent-' + readableRedirectToIntentName,
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
</template>

<script>
import { links } from '@/constants'

export default {
  props: ['readableRedirectToIntentName'],
  data() {
    return {
      jiraHelpDesk: links.jiraHelpDesk,
    }
  },
}
</script>

<style lang="scss" scoped>
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
</style>
