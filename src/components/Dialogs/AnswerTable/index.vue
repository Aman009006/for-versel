<template>
  <div class="table-container">
    <div v-if="disabled" class="disabled-layer" />

    <el-table :data="answers" stripe >
      <el-table-column align="center" label="Beschreibung" prop="description" width="150" />

      <el-table-column :label="answerText" min-width="500">
        <template #default="scope">
          <div v-if="humanReadableAnswers.length > 0" v-html="renderToMarkdown(humanReadableAnswers[scope.$index].text)"></div>
          <div v-else v-html="renderToMarkdown(scope.row.text)" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="Buttons" width="200">
        <template #default="{ row: answer }">
          <template v-if="answer.buttons && answerConfig.type == 'multi'">
            <ButtonList :buttons="answer.buttons" />
          </template>
          <template v-else>
            <el-alert title="Diese Antwort hat keine Buttons" type="info" :closable="false" center />
          </template>
        </template>
      </el-table-column>

      <el-table-column align="center" width="130" data="answers">
        <template #default="{ row: answer }">
          <EditAnswerModal :answer="answer" :answerConfig="answerConfig" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ButtonList from "@/components/Dialogs/ButtonList/index.vue";
import EditAnswerModal from "@/components/Dialogs/EditAnswerModal/index.vue";
import { humanReadableLabels } from "@/constants";
import PlaceholderUtilities from "@/store/utilities/PlaceholderUtilities";
import PlaceholderReplacer from "@/utils/placeholder/placeholderReplacer";
import MarkdownIt from "markdown-it";
import addHighlightSearchWord from "@/utils/AddHihlightSearchWordUtils";
const md = MarkdownIt({ html: false });

export default {
  components: {
    ButtonList,
    EditAnswerModal,
  },
  props: ["disabled", "answers", "answerConfig"],
  data() {
    return {
      answerText: humanReadableLabels.answerText,
      placeholderReady: false,
      allPlaceholders: [],
      humanReadableAnswers: [],
    };
  },
  computed: {
    searchValue() {
      return this.$store.getters.search
    }
  },
  async created() {
    await this.loadData();
  },
  async updated() {
    await this.loadData();
  },
  methods: {
    async loadData() {
      await PlaceholderUtilities.fetchPlaceholders(this.$store);
      this.placeholderReady = true;
      this.allPlaceholders = PlaceholderUtilities.getAllPlaceholders(this.$store);
      this.humanReadableAnswers = new PlaceholderReplacer(this.answers, this.allPlaceholders).replaceAnswers();
    },
    renderToMarkdown(text) {
      const renderText = md.render(text);
      return addHighlightSearchWord(renderText, this.searchValue)
    },
  },
};
</script>

<style lang="scss" scoped>
.table-container {
  position: relative;
  // The chatbot, which has a fixed position, should not cover the table
  margin-bottom: 120px;

  .disabled-layer {
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    background-color: rgb(239 239 239 / 77%);
  }
}
</style>
