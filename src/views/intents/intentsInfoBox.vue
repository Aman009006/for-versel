<template>
  <div class="intents-infobox">
    <h1>Dialog Übersicht</h1>
    <span>
      <p>
        Wählen Sie die gewünschte Dialogkategorie um die unterliegenden Anliegen angezeigt
        zu bekommen.
      </p>
      <p>
        <span style="font-weight: bold; text-transform: uppercase; font-size: 13px">WICHTIG:
        </span>
        Sollten Sie neue Inhalte wünschen, die Sie hier noch nicht finden konnten, stellen
        Sie uns gerne ein Ticket über das Jira Service Desk mit den gewünschten Inhalten.
      </p>
    </span>
  </div>
  </template>

<script>
export default {
  name: "IntentsInfoBox",
  components: {},
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.intents-infobox {
  width: 40%;
}

h1 {
  margin-bottom: 10px;
}

span {
  font-size: 14px;
  line-height: 1.5;

  p {
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style>
