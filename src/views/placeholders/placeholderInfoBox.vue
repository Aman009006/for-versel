<template>
  <div class="placeholderInfoBox infoBox">
    <div class="placeholderInfoBoxContent">
      <div>
        <h1>Platzhalter</h1>
        <span>
        <p style="font-size: 14px">
          Mithilfe von Platzhaltern können Sie einmalig definierte Textpassagen
          in beliebig vielen Dialogantworten parallel anzeigen lassen. Sobald
          Sie am Inhalt der Textpassage eine Änderung vornehmen, überträgt sich
          diese automatisch auf alle Vorkommen des Platzhalters, sodass die
          Pflege der einzelnen Dialogantworten entfällt.
        </p>

        <p style="font-size: 14px">
          Alle Platzhalter setzen sich aus zwei Teilen zusammen: Die
          Platzhalterbezeichnung dient als ID des Platzhalters und wird in einer
          Dialogantwort an gewünschter Stelle in der Form
          ##Platzhalterbezeichnung## eingesetzt. Der Platzhalterwert enthält den
          konkreten Ausdruck oder die Textpassage, die Ihr Kunde im Chatbot
          sieht.
        </p>

        <p style="font-size: 14px">
          In der folgenden Tabelle können Sie Ihre Platzhalter erstellen,
          bearbeiten oder löschen.
        </p>

        <p style="font-size: 14px">
          <span
            style="
              font-weight: bold;
              text-transform: uppercase;
              font-size: 13px;
            "
          >
            Tipp:
          </span>
          Um Dialoge zu finden, in denen die Platzhalter verwendet werden, geben
          Sie die Platzhalter einfach in der Form ##Platzhalterbezeichnung## im
          Suchfeld ein.
        </p>
      </span>
      </div>
      <div class="input-content">
        <searchInput class="intent-search" placeholder="Platzhalter Suche" searchScope="placeholderGroup"
          :searchableArray="allPlaceholders" @filteredArray="updateIntentGroups">
        </searchInput>
      </div>
    </div>
  </div>
</template>
<script>
import searchInput from "@/components/SearchInput/index.vue";
import PlaceholderUtilities from "@/store/utilities/PlaceholderUtilities";
import placeholderTable from "@/views/placeholders/placeholderTable.vue";
import SearchUtilities from "@/store/utilities/SearchUtilities";

export default {
  components: {
    placeholderTable,
    searchInput
  },
  computed: {
    allPlaceholders() {
      return PlaceholderUtilities.getAllPlaceholders(this.$store);
    },
  },
  async created() {
    /**
     * Fetch the data when the view is created
     * and the data is already being observed
     */
    await this.loadData();
    // this is necessary so that when we enter the
    // page through a redirect of the main search,
    // it does not replace the array with data
    if (!this.filteredArray.length) {
      PlaceholderUtilities.setFilteredPlaceholders(this.$store, this.allPlaceholders)
    }
  },
  data() {
    return {
      filteredArray: [],
    };
  },
  unmounted() {
    SearchUtilities.addSearchTextToStore(this.$store, '')
  },
  methods: {
    async loadData() {
      await PlaceholderUtilities.fetchPlaceholders(this.$store);
    },
    updateIntentGroups(array) {
      const filteredPlaceholders = array.slice()
      PlaceholderUtilities.setFilteredPlaceholders(this.$store, filteredPlaceholders)
      this.filteredArray = filteredPlaceholders;
    },
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.placeholderInfoBox {
  background-color: $hsag-lightgrey;
  padding: 15px 25px;
  margin-bottom: 20px;

  h1 {
    margin-top: 0px;
    color: #303133;
  }
}

.text {
  font-size: 14px;
}

.placeholderInfoBoxContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}
.input-content {
  min-width: 380px;
}
</style>

