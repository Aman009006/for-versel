<template>
  <div>
    MOCKUP
    <div v-if="dataReady">
      <el-cascader :options="options" />
    </div>
  </div>
</template>

<script>
import { getSkillsWithIntents } from '@/api/answers'
export default {
  name: 'TestSkills',
  props: {},
  data() {
    return {
      dataReady: false,
      options: []
    }
  },
  computed: {},
  created() {},

  async mounted() {
    const skillsWithIntents = await getSkillsWithIntents()
    skillsWithIntents.forEach(skillWithIntent => {
      // fill the children (intents)
      var tempChildren = []
      skillWithIntent.IntentNames.forEach(intentName => {
        tempChildren.push({ value: intentName, label: intentName })
      })
      // fill in the next skill with the intents
      this.options.push({ value: skillWithIntent.SkillName, label: skillWithIntent.SkillName, children: tempChildren })
    })
    // now the data is filled and can be used
    this.dataReady = true
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
