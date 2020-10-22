<template>
  <div>
    <div v-if="dataReady">
      <el-cascader-panel :options="options" />
    </div>
  </div>
</template>

<script>
import { getSkillsWithIntents } from '@/api/skillsWithIntents'
export default {
  name: 'TestSkills',
  props: {},
  data() {
    return {
      dataReady: false,
      skill: 'default',
      options: []
    }
  },
  computed: {},
  created() {},

  async mounted() {
    const skillsWithIntents = await getSkillsWithIntents()
    skillsWithIntents.forEach(skillWithIntent => {
      this.options.push({ value: skillWithIntent.SkillName, label: skillWithIntent.SkillName })
      skillWithIntent.IntentNames.forEach(intentName => {
        // to fill the children
      })
    })
    this.dataReady = true
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
