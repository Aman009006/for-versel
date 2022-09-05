<template>
  <div class="editAnswerModal">
    <el-button
      class="edit-btn"
      :icon="ElIconEdit"
      @click="openEditModal()"
    >
      Bearbeiten
    </el-button>

    <div v-if="editModalOpened" class="modalBox">
      <div class="modalContent">
        <EditAnswer ref="editAnswerRef" :answer="answer" />
        <div class="buttonsContainer">
          <el-button
            class="confirm-btn"
            :disabled="confirmButtonDisabled"
            @click="saveAnswer()"
          >
            Speichern
          </el-button>
          <el-button class="cancel-btn" @click="closeEditModal()">
            Abbrechen
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Edit as ElIconEdit } from '@element-plus/icons'
import EditAnswer from '@/components/Dialogs/EditAnswer'
import { dispatchNames } from '@/constants'

export default {
  data() {
    return {
      editModalOpened: false,
      confirmButtonDisabled: false,
      ElIconEdit,
    }
  },
  components: {
    EditAnswer,
  },
  props: ['answer'],
  computed: {
    readableIntentName() {
      return this.$route.meta.title
    },
  },
  methods: {
    openEditModal() {
      this.confirmButtonDisabled = false
      this.editModalOpened = true
    },
    closeEditModal() {
      this.editModalOpened = false
    },
    async saveAnswer() {
      this.confirmButtonDisabled = true
      await this.$refs.editAnswerRef.saveAnswerAndButtons()
      this.refreshAnswers()
      this.closeEditModal()
    },
    async refreshAnswers() {
      this.$store.dispatch(
        dispatchNames.getAndSetIntentAnswers,
        this.readableIntentName
      )
      this.setSkillsAndIntents()
    },
    setSkillsAndIntents() {
      this.$store.dispatch(dispatchNames.setSkillsAndIntentsFullQualified)
    },
  },
}
</script>

<style lang="scss" scoped>
.modalBox {
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background-color: rgb(0 0 0 / 38%);
  overflow-y: scroll;

  .modalContent {
    width: 95%;
    margin: auto;
    max-width: 850px;
    padding: 25px;
    background-color: white;
    text-align: left;

    .buttonsContainer {
      margin-top: 15px;
    }
  }
}
</style>
